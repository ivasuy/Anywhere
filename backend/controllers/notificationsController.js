import { TryCatch } from "../middleware/error";
import { Notification } from "../models/notificationModel";

export const allNotifications = TryCatch(async (req, res, next) => {
    const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        notifications,
    });
})