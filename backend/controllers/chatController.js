import { TryCatch } from "../middleware/error.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import { Chat } from "../models/chatModel.js"
import { emitEvent } from "../utils/apifeatures.js";
import { ALERT, REFETCH_CHATS } from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";
import userModel from "../models/userModel.js";

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

    // console.log("bhag lode", chat);

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
        User.findById(userId, "name"),
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

export { newGroupChat, getMyChat, getMyGroups, addMembers, removeMembers };