import { ErrorHandler } from '../utils/errorHandler.js';  // Corrected import statement
import { NEW_REQUEST } from "../constants/events.js";
import { TryCatch } from "../middleware/error.js";
import { Request } from "../models/requestModel.js"
import { emitEvent } from "../utils/apifeatures.js"
import userModel from "../models/userModel.js";
import { Notification } from '../models/notificationModel.js';


export const sendChumRequest = TryCatch(async (req, res, next) => {
    const { userId } = req.body;

    const request = await Request.findOne({
        $or: [
            { sender: req.user, receiver: userId },
            { sender: userId, receiver: req.user },
        ],
    });

    if (request) return next(new ErrorHandler("Request already sent", 400));

    await Request.create({
        sender: req.user,
        receiver: userId,
    });

    // Create a notification for the receiver
    await Notification.create({
        user: userId,
        type: "chumRequest",
        message: `${req.user.name} has sent you a chum request.`,
    });

    emitEvent(req, NEW_REQUEST, [userId]);

    return res.status(200).json({
        success: true,
        message: "Chum Request Sent",
    });

});


export const acceptChumRequest = TryCatch(async (req, res, next) => {
    const { requestId, accept } = req.body;

    const request = await Request.findById(requestId)
        .populate("sender", "name")
        .populate("receiver", "name");

    if (!request) return next(new ErrorHandler("Request not found", 404));

    if (request.receiver._id.toString() !== req.user._id.toString())
        return next(new ErrorHandler("You are not authorized to accept this request", 401));

    if (!accept) {
        await request.deleteOne();
        return res.status(200).json({
            success: true,
            message: "Friend Request Rejected",
        });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const senderId = request.sender._id;
        const receiverId = request.receiver._id;

        // Add each user to the other's chumList
        await userModel.findByIdAndUpdate(senderId, { $addToSet: { chumList: receiverId } }, { session });
        await userModel.findByIdAndUpdate(receiverId, { $addToSet: { chumList: senderId } }, { session });

        // Optionally create a chat and delete the request within the transaction
        // await Chat.create([{ members: [senderId, receiverId], name: `${request.sender.name}-${request.receiver.name}` }], { session });
        await request.deleteOne({ session });

        await session.commitTransaction();
        session.endSession();

        // Emit an event if needed
        emitEvent(req, REFETCH_CHATS, [senderId, receiverId]);

        return res.status(200).json({
            success: true,
            message: "Friend Request Accepted",
            senderId: senderId,
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return next(new ErrorHandler("Failed to accept friend request", 500));
    }
});


export const beholdUser = TryCatch(async (req, res, next) => {
    const { userId } = req.body;

    // console.log("userId from backend", userId);

    if (!userId) {
        return next(new ErrorHandler("Please provide userId of user to behold", 500));

    }

    const currentUser = await userModel.findById(req.user._id); // Authenticated user
    const targetUser = await userModel.findById(userId); // User to be added to behold list

    if (!targetUser) {
        return next(new ErrorHandler("User not found", 404));
    }

    if (!currentUser.beholdList.includes(userId)) {
        currentUser.beholdList.push(userId);
    } else {
        return next(new ErrorHandler("User alredy present in behold list", 400));


    }

    await currentUser.save();

    res.status(200).json({
        success: true,
        message: "User added to behold list successfully",
        user: currentUser
    });
})

export const removeBeholdUser = TryCatch(async (req, res, next) => {
    const { userId } = req.body;
    const loggedInUserId = req.user._id; // Assuming you have the logged-in user's ID in req.user

    // Find the logged-in user
    const loggedInUser = await userModel.findById(loggedInUserId);

    if (!loggedInUser) {
        return res.status(404).json({ success: false, message: "Logged-in User not found" });
    }

    // Remove the specified user from the beholdList
    const index = loggedInUser.beholdList.indexOf(userId);
    if (index > -1) {
        loggedInUser.beholdList.splice(index, 1);
    } else {
        return res.status(404).json({ success: false, message: "User to be removed not found in behold list" });
    }

    // Save the updated user document
    await loggedInUser.save();

    res.status(200).json({
        success: true,
        message: "User removed from behold list successfully"
    });
});


export const checkBeholdUser = TryCatch(async (req, res, next) => {
    const { userId } = req.body;
    const loggedInUserId = req.user._id; // Assuming you have user id available in req.user


    const loggedInUser = await userModel.findById(loggedInUserId).populate('beholdList');

    if (!loggedInUser) {
        return res.status(404).json({ success: false, message: "Logged-in User not found" });
    }

    const isUserInBeholdList = loggedInUser.beholdList.find(beholdUser => beholdUser._id.toString() === userId) !== undefined;

    res.status(200).json({
        success: true, isInBeholdList: isUserInBeholdList
    });
});


export const fetchCount = TryCatch(async (req, res, next) => {

    const currentUserId = req.body.userId;

    // Count documents where the logged-in user is in other users' beholdList
    const countBeheldByOthers = await userModel.countDocuments({
        beholdList: currentUserId,
    });

    // Find the logged-in user's beholdList
    const loggedInUser = await userModel.findById(currentUserId).select("beholdList");
    const countBeholdListUsers = loggedInUser ? loggedInUser.beholdList.length : 0;


    res.status(200).json({
        success: true,
        count: {
            countBeheldByOthers,
            countBeholdListUsers,
        },
        // message: `Total users who have beheld the current user: ${countBeheldByOthers}, Total users beheld by the current user: ${countBeheldByLoggedInUser}`,
    });
});
