
import { TryCatch } from "../middleware/error.js";
import { Notification } from "../models/notificationModel.js";

export const myNotifications = TryCatch(async (req, res, next) => {

    const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        allNotifications: notifications,
    });
})


export const updateReadReceipt = TryCatch(async (req, res) => {
    const updatedNotifications = await Notification.updateMany(
        { user: req.user._id, read: false },
        { $set: { read: true } }
    );

    if (updatedNotifications.nModified === 0) {
        return res.status(404).json({ message: 'No unread notifications found' });
    }

    res.status(200).json({
        message: 'Notifications updated successfully',
        updatedCount: updatedNotifications.nModified,
    });
});

