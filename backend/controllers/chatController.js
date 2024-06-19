import { TryCatch } from "../middleware/error.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import { Chat } from "../models/chatModel.js"
import { deleteFilesFromCloudinary, emitEvent } from "../utils/apifeatures.js";
import { ALERT, NEW_ATTACHMENT, NEW_MESSAGE_ALERT, REFETCH_CHATS } from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";
import userModel from "../models/userModel.js";
import { Message } from "../models/messageModel.js";


export const newSingleChat = TryCatch(async (req, res, next) => {
    const { userId } = req.body;
    const loggedInUserId = req.user._id; // Assuming you have the logged-in user's ID in req.user

    if (!userId || !loggedInUserId) {
        return res.status(400).json({ success: false, message: "User ID is required" });
    }

    try {
        // Check if the user exists
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check if a chat already exists with the same members (optional)
        let existingChat = await Chat.findOne({
            members: { $all: [loggedInUserId, userId], $size: 2 },
            groupChat: false
        });

        if (existingChat) {
            return res.status(400).json({ success: false, message: "Chat already exists" });
        }

        // Create a new chat
        const newChat = new Chat({
            creator: loggedInUserId,
            members: [loggedInUserId, userId],
            groupChat: false
        });

        await newChat.save();

        res.status(201).json({ success: true, message: "Chat created successfully", chat: newChat });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
});


const newGroupChat = TryCatch(async (req, res, next) => {
    const { name, members } = req.body;

    if (members.length < 2) return next(new ErrorHandler("Group chat must have atleast 3 members", 400));

    const allMembers = [...members, req.user];

    await Chat.create({
        name,
        groupChat: true,
        creator: req.user,
        members: allMembers
    })

    emitEvent(req, ALERT, allMembers, `Welcome to ${name} group`)
    emitEvent(req, REFETCH_CHATS, members)

    return res.status(201).json({
        success: true,
        message: "Group created",
    })
});

// getMyChat complex
// const getMyChat = TryCatch(async (req, res) => {
//     // console.log(req.user)
//     const chats = await Chat.find({ members: req.user }).populate("members", "name avatar")

//     const transformedChats = chats.map((chat) => {

//         const otherMember = getOtherMember(chat.members, req.user);

//         return {
//             _id: chat._id,
//             name: chat.groupChat ? chat.name : otherMember.name,
//             avatar: chat.groupChat ? chat.members.slice(0, 3).map(({ avatar }) => avatar.url) : [otherMember.avatar.url],
//             groupChat: chat.groupChat,
//             members: chat.members.reduce((prev, curr) => {
//                 if (curr._id.toString() !== req.user.toString()) {
//                     prev.push(curr._id);
//                 }
//                 return prev;
//             }, []),
//             lastMessage: chat.lastMessage
//         }
//     })

//     return res.status(200).json({
//         success: true,
//         chats: transformedChats,
//         // chats,
//     })
// })
const getMyChat = TryCatch(async (req, res) => {
    const userId = req.user._id;

    // Find all chats the user is a member of
    const chats = await Chat.find({ members: userId }).populate('members', 'name');

    console.log(chats);
    res.status(200).json({
        success: true,
        chats: chats
    })
})

const getMyGroups = TryCatch(async (req, res) => {
    const chats = await Chat.find({
        // members: req.user,
        // groupChat: true,
        creator: req.user
    }).populate("members", "name avatar");

    res.status(200).json({
        success: true,
        groups: chats
    })
})

const addMembers = TryCatch(async (req, res, next) => {

    const { chatId, members } = req.body;

    if (!members || members.length < 1) {
        return next(new ErrorHandler("Please provide members", 400));
    }


    const chat = await Chat.findById(chatId);

    console.log("bhag lode", chat);

    if (!chat) return next(new ErrorHandler("chat not found", 404));

    if (!chat.groupChat) return next(new ErrorHandler("This is not a group chat", 400));


    if (chat.creator.toString() !== req.user._id.toString()) {
        return next(new ErrorHandler("You are not allowed to add members", 403));
    }

    const allNewMembersPromise = members.map((i) => userModel.findById(i));

    const allNewMembers = await Promise.all(allNewMembersPromise);

    const uniqueMembers = allNewMembers.filter((i) => !chat.members.includes(i._id.toString())).map((i) => i._id);

    // chat.members.push(...allNewMembers.map((i) => i._id));
    chat.members.push(...uniqueMembers);
    await chat.save();

    const allUsersName = allNewMembers.map((i) => i.name).join(",");

    emitEvent(req, ALERT, chat.members, `${allUsersName} have been added to ${chat.name} by ${req.user.name}`)

    emitEvent(req, REFETCH_CHATS, chat.members, `${allUsersName} have been added to ${chat.name} by ${req.user.name}`)

    res.status(200).json({
        success: true,
        message: "Members added successfully",
        allNewMembers: allNewMembers
    })
})

const removeMembers = TryCatch(async (req, res, next) => {
    const { userId, chatId } = req.body;

    const [chat, userThatWillBeRemoved] = await Promise.all([
        Chat.findById(chatId),
        userModel.findById(userId, "name"),
    ]);

    if (!chat) return next(new ErrorHandler("chat not found", 404));

    if (!chat.groupChat) return next(new ErrorHandler("This is not a group chat", 400));


    if (chat.creator.toString() !== req.user._id.toString()) {
        return next(new ErrorHandler("You are not allowed to add members", 403));
    }

    chat.members = chat.members.filter((member) => member.toString() !== userId.toString());

    await chat.save();

    emitEvent(req, ALERT, chat.members, `${userThatWillBeRemoved.name} has been removed from the group`)

    emitEvent(req, REFETCH_CHATS, chat.members);

    return res.status(200).json({
        success: true,
        message: "Members removed successfully",
    })
})


const leaveGroup = TryCatch(async (req, res, next) => {
    const chatId = req.params.id;

    const chat = await Chat.findById(chatId);

    if (!chat) return next(new ErrorHandler("chat not found", 404));

    if (!chat.groupChat) return next(new ErrorHandler("This is not a group chat", 400));

    const remainingMembers = chat.members.filter((member) =>
        member.toString() !== req.user._id.toString()
    )

    if (chat.creator.toString() == req.user._id.toString()) {
        const newCreator = remainingMembers[0];
        chat.creator = newCreator;
    }


    chat.members = remainingMembers;

    await chat.save();

    emitEvent(req, ALERT, chat.members, `${req.user.name} has left the group`)

    emitEvent(req, REFETCH_CHATS, chat.members);

    return res.status(200).json({
        success: true,
        message: "Member left successfully",
    })

})


//send attachments
const sendAttachment = TryCatch(async (req, res, next) => {

    const { chatId } = req.body;

    // const [chat] = await Promise.all([
    //     Chat.findById(chatId),
    // ]);

    const chat = await Chat.findById(chatId);

    if (!chat) return next(new ErrorHandler("Chat not found", 404));

    const files = req.files || [];

    if (files.length < 1) return next(new ErrorHandler("Please provide attachments", 400));

    // Upload files here

    const attachments = [];

    const messageForRealTime = {
        content: "",
        attachments,
        sender: {
            _id: req.user._id,
            name: req.user.name
        },
        chat: chatId
    };

    const messageForDB = {
        content: "", attachments,
        sender: req.user._id,
        chat: chatId
    };

    const message = await Message.create(messageForDB);

    emitEvent(req, NEW_ATTACHMENT, chat.members, {
        message: messageForRealTime,
        chatId,
    })

    emitEvent(req, NEW_MESSAGE_ALERT, chat.members, { chatId });

    return res.status(200).json({
        success: true,
        message
    })
})

const getChatDetails = TryCatch(async (req, res, next) => {
    if (req.query.populate === "true") {

        const chat = await Chat.findById(req.params.id).populate("members", "name avatar").lean();

        if (!chat) return next(new ErrorHandler("Chat not found", 404));

        //after using .lean() now chat.members is not a mongodb object instead it is now a plain js object
        chat.members = chat.members.map(({ _id, name, avatar }) => ({
            _id,
            name,
            avatar: avatar?.url
        }));

        return res.status(200).json({
            success: true,
            chat
        })
    }
    else {
        const chat = await Chat.findById(req.params.id);

        if (!chat) return next(new ErrorHandler("Chat not found", 404));

        return res.status(200).json({
            success: true,
            chat
        })
    }


})

const renameGroup = TryCatch(async (req, res, next) => {
    const chatId = req.params.id;
    const { name } = req.body;

    const chat = await Chat.findById(chatId);

    if (!chat) return next(new ErrorHandler("Chat not found", 404));

    if (!chat.groupChat) return next(new ErrorHandler("This is not a group chat", 400));

    if (chat.creator.toString() !== req.user._id.toString())
        return next(
            new ErrorHandler("You are not allowed to rename the group", 403)
        );

    chat.name = name;

    await chat.save();

    emitEvent(req, REFETCH_CHATS, chat.members);

    return res.status(200).json({
        success: true,
        message: "Group renamed successfully",
    });

})

const deleteChat = TryCatch(async (req, res, next) => {
    const chatId = req.params.id;

    const chat = await Chat.findById(chatId);

    if (!chat) return next(new ErrorHandler("Chat not found", 404));

    const members = chat.members;

    if (chat.groupChat && chat.creator.toString() !== req.user._id.toString())
        return next(
            new ErrorHandler("You are not allowed to delete the group", 403)
        );

    if (!chat.groupChat && !chat.members.includes(req.user._id.toString())) {
        return next(
            new ErrorHandler("You are not allowed to delete the chat", 403)
        );
    }

    //   Here we have to dete All Messages as well as attachments or files from cloudinary

    const messagesWithAttachments = await Message.find({
        chat: chatId,
        attachments: { $exists: true, $ne: [] },
    });

    const public_ids = [];

    messagesWithAttachments.forEach(({ attachments }) =>
        attachments.forEach(({ public_id }) => public_ids.push(public_id))
    );

    await Promise.all([
        deleteFilesFromCloudinary(public_ids),
        chat.deleteOne(),
        Message.deleteMany({ chat: chatId }),
    ]);

    emitEvent(req, REFETCH_CHATS, members);

    return res.status(200).json({
        success: true,
        message: "Chat deleted successfully",
    });
})

const getMessages = TryCatch(async (req, res, next) => {
    const chatId = req.params.id;
    const { page = 1 } = req.query;

    const resultPerPage = 20;
    const skip = (page - 1) * resultPerPage;

    const chat = await Chat.findById(chatId);

    if (!chat) return next(new ErrorHandler("Chat not found", 404));

    if (!chat.members.includes(req.user._id.toString()))
        return next(
            new ErrorHandler("You are not allowed to access this chat", 403)
        );

    const [messages, totalMessagesCount] = await Promise.all([
        Message.find({ chat: chatId })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(resultPerPage)
            .populate("sender", "name")
            .lean(),
        Message.countDocuments({ chat: chatId }),
    ]);

    const totalPages = Math.ceil(totalMessagesCount / resultPerPage) || 0;

    return res.status(200).json({
        success: true,
        messages: messages.reverse(),
        totalPages,
    });
});

export {
    newGroupChat,
    getMyChat,
    getMyGroups,
    addMembers,
    removeMembers,
    leaveGroup,
    sendAttachment,
    getChatDetails,
    renameGroup,
    deleteChat,
    getMessages
};