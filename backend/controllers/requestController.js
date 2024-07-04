import { ErrorHandler } from '../utils/errorHandler.js';  // Corrected import statement
import { NEW_REQUEST, REFETCH_CHATS } from "../constants/events.js";
import { TryCatch } from "../middleware/error.js";
import { Request } from "../models/requestModel.js"
import { emitEvent } from "../utils/apifeatures.js"
import userModel from "../models/userModel.js";
import { Notification } from '../models/notificationModel.js';
import mongoose from 'mongoose';


export const sendChumRequest = TryCatch(async (req, res, next) => {

    console.log("ghode k bache");
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

    console.log("lode k bache", request)

    if (!request) {
        return next(new ErrorHandler("Request not found", 404));
    }

    if (request.receiver._id.toString() !== req.user._id.toString()) {
        return next(
            new ErrorHandler("You are not authorized to accept this request", 401)
        );
    }

    if (!accept) {
        await request.deleteOne();
        return res.status(200).json({
            success: true,
            message: "Chum Request Rejected",
        });
    }

    const senderId = request.sender._id;
    const receiverId = request.receiver._id;

    // Add each user to the other's chumList
    await userModel.findByIdAndUpdate(senderId, { $addToSet: { chumList: receiverId } });
    await userModel.findByIdAndUpdate(receiverId, { $addToSet: { chumList: senderId } });

    await request.deleteOne()

    const members = [request.sender._id, request.receiver._id];


    emitEvent(req, REFETCH_CHATS, members);

    return res.status(200).json({
        success: true,
        message: "Friend Request Accepted",
        senderId: senderId,
    });
});

export const checkChumRequestStatus = TryCatch(async (req, res) => {
    const { userId } = req.body; // ID of the user to check the request status for
    const loggedInUserId = req.user._id; // ID of the logged-in user

    // Check if there is a pending request
    const request = await Request.findOne({
        $or: [
            { sender: loggedInUserId, receiver: userId },
            { sender: userId, receiver: loggedInUserId }
        ]
    });

    if (request) {
        // If request is found, return its status
        return res.status(200).json({ status: request.status });
    } else {
        // If no request is found, check if the user is in the logged-in user's chum list
        const loggedInUser = await userModel.findById(loggedInUserId).populate('chums');

        const isChum = loggedInUser.chums.some(chum => chum._id.equals(userId));

        if (isChum) {
            // If user is in the chum list, the request is accepted
            return res.status(200).json({ status: "accepted" });
        } else {
            // If user is not in the chum list, the request is rejected
            return res.status(200).json({ status: "rejected" });
        }
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


export const myAllRequests = TryCatch(async (req, res) => {
    const userId = req.user._id; // Assuming the authenticated user's ID is available in req.user.id

    // Find requests where the user is the receiver
    const receivedRequests = await Request.find({ receiver: userId }).populate("sender receiver").sort({ createdAt: -1 });

    // Find requests where the user is the sender
    const sentRequests = await Request.find({ sender: userId }).populate("sender receiver").sort({ createdAt: -1 });

    console.log(receivedRequests);

    // Send the results
    res.status(200).json({
        receivedRequests,
        sentRequests,
    });
});

