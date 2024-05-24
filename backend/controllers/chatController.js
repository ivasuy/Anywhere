import { TryCatch } from "../middleware/error.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import { Chat } from "../models/chatModel.js"
import { emitEvent } from "../utils/apifeatures.js";
import { ALERT, REFETCH_CHATS } from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";

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

const getMyChat = TryCatch(async (req, res) => {
    // console.log(req.user)
    const chats = await Chat.find({ members: req.user }).populate("members", "name email")

    const transformedChats = chats.map((chat) => {

        const otherMember = getOtherMember(chat.members, req.user);

        return {
            _id: chat._id,
            lodaname: chat.groupChat ? chat.name : otherMember.name,
            avatar: chat.groupChat ? chat.members.slice(0, 3).map(({ avatar }) => avatar.url) : [otherMember.avatar.url],
            groupChat: chat.groupChat,
            members: chat.members.reduce((prev, curr) => {
                if (curr._id.toString() !== req.user.toString()) {
                    prev.push(curr._id)
                }
            }),
            lastMessage: chat.lastMessage
        }
    })

    return res.status(200).json({
        success: true,
        // chats: transformedChats,
        chats,
    })
})



export { newGroupChat, getMyChat };