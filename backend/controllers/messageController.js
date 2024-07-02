import { TryCatch } from "../middleware/error";
import { Chat } from "../models/chatModel";
import { Message } from "../models/messageModel";
import { Notification } from "../models/notificationModel";

const sendMessage = TryCatch(async (req, res, next) => {
    const { chatId, message } = req.body;
    const loggedInUserId = req.user._id; // Assuming you have the logged-in user's ID in req.user

    if (!chatId || !message || !loggedInUserId) {
        return res.status(400).json({ success: false, message: "Chat ID, message, and user ID are required" });
    }

    try {
        // Ensure the chat exists
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ success: false, message: "Chat not found" });
        }

        // Create the message
        const newMessage = new Message({
            chat: chatId,
            sender: loggedInUserId,
            content: message
        });

        await newMessage.save();
        // Create notifications for other chat members
        chat.members.forEach(async (member) => {
            if (member._id.toString() !== loggedInUserId.toString()) {
                await Notification.create({
                    user: member._id,
                    type: "message",
                    message: `New message from ${req.user.name}: ${message}`,
                });
            }
        });

        res.status(201).json({ success: true, message: "Message sent successfully", message: newMessage });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
});



export default sendMessage;
