import { ErrorHandler } from '../utils/errorHandler.js';  // Corrected import statement
import { NEW_REQUEST, REFETCH_CHATS } from "../constants/events.js";
import { TryCatch } from "../middleware/error.js";
import { Request } from "../models/requestModel.js"
import { emitEvent } from "../utils/apifeatures.js"
import userModel from "../models/userModel.js";
import { Notification } from '../models/notificationModel.js';
import mongoose from 'mongoose';


export const sendChumRequest = TryCatch(async (req, res, next) => {

    // console.log("ghode k bache");
    const { userId } = req.body;

    const request = await Request.findOne({
        $or: [
            { sender: req.user._id, receiver: userId },
            { sender: userId, receiver: req.user._id },
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


    if (!request) {
        return next(new ErrorHandler("Request not found", 404));
    }

    if (!accept) {
        await request.deleteOne();
        return res.status(200).json({
            success: true,
            message: "Chum Request Rejected",
        });
    }

    if (request.receiver._id.toString() !== req.user._id.toString()) {
        return next(
            new ErrorHandler("You are not authorized to accept this request", 401)
        );
    }


    const senderId = request.sender._id;
    const receiverId = request.receiver._id;

    // Add each user to the other's chumList
    await userModel.findByIdAndUpdate(senderId, { $addToSet: { chumList: receiverId } });
    await userModel.findByIdAndUpdate(receiverId, { $addToSet: { chumList: senderId } });

    await request.deleteOne()

    const members = [request.sender._id, request.receiver._id];

    await Notification.create({
        user: senderId,
        type: "chumRequest",
        message: `${req.user.name} has accepted your chum request.`,
    });


    emitEvent(req, REFETCH_CHATS, members);

    return res.status(200).json({
        success: true,
        message: "Friend Request Accepted",
        senderId: senderId,
    });
});

// Controller to fetch all users from the logged-in user's chumList
export const allChumsList = TryCatch(async (req, res) => {
    const loggedInUser = req.user._id;

    // Find the logged-in user and populate the chumList
    const user = await userModel.findById(loggedInUser).populate('chumList');

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    res.status(200).json({
        success: true,
        chums: user.chumList,
    });
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

export const deleteChum = TryCatch(async (req, res) => {
    const { userId } = req.body;
    const loggedInUserId = req.user._id;

    // console.log("userId", userId)
    // console.log("loggedInUserId", loggedInUserId)

    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "User ID is required"
        });
    }

    // Find the logged-in user and the user to remove from chumList
    const loggedInUser = await userModel.findById(loggedInUserId);
    const userToRemove = await userModel.findById(userId);

    if (!loggedInUser || !userToRemove) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    // Remove each user from the other's chumList
    loggedInUser.chumList = loggedInUser.chumList.filter(id => id.toString() !== userId);
    userToRemove.chumList = userToRemove.chumList.filter(id => !id.equals(loggedInUserId));

    // console.log("loggedInUserChumList", loggedInUser.chumList)
    // console.log("userToRemoveChumList", userToRemove.chumList)

    // Save the changes to both users
    await loggedInUser.save();
    await userToRemove.save();

    return res.status(200).json({
        success: true,
        message: "Chum removed successfully"
    });
})

export const checkChumStatus = TryCatch(async (req, res, next) => {
    const { userId } = req.body;
    const loggedInUserId = req.user._id;

    const loggedInUser = await userModel.findById(loggedInUserId).populate('chumList');

    if (!loggedInUser) {
        return res.status(404).json({ success: false, message: "Logged-in User not found" });
    }

    const isUserInChumList = loggedInUser.chumList.find(chum => chum._id.toString() === userId);

    if (isUserInChumList) {
        return res.status(200).json({
            success: true,
            request: false,
            request_sender: false,
            chum: true,
            userId: userId
        });
    }

    const request = await Request.findOne({
        $or: [
            { sender: loggedInUserId, receiver: userId },
            { sender: userId, receiver: loggedInUserId }
        ]
    });


    if (request) {
        if (request.sender.equals(loggedInUserId)) {
            return res.status(200).json({
                request: true,
                request_sender: true,
                chum: false,
                userId: userId
            });
        }
        else if (request.sender.equals(userId)) {
            return res.status(200).json({
                request: true,
                request_sender: false,
                chum: false,
                userId: userId
            });
        }
    }

    return res.status(200).json({
        request: false,
        request_sender: false,
        chum: false,
        userId: userId
    });
});


export const fetchCount = TryCatch(async (req, res, next) => {

    const currentUserId = req.body.userId;

    // Count documents where the logged-in user is in other users' beholdList
    const countBeheldByOthers = await userModel.countDocuments({
        beholdList: currentUserId,
    });

    // Find the logged-in user's beholdList
    const user = await userModel.findById(currentUserId).select("beholdList chumList");
    const countBeholdListUsers = user ? user.beholdList.length : 0;
    const countChumListUsers = user ? user.chumList.length : 0;


    res.status(200).json({
        success: true,
        count: {
            countBeheldByOthers,
            countBeholdListUsers,
            countChumListUsers
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

    // console.log(receivedRequests);

    // Send the results
    res.status(200).json({
        receivedRequests,
        sentRequests,
    });
});

export const getPurposeRequests = TryCatch(async (req, res) => {

    const { userId, purpose } = req.body;

    if (purpose === "accept") {
        const request = await Request.findOne({ sender: userId, receiver: req.user._id }).populate("sender receiver")

        // console.log(request);

        return res.status(200).json({
            success: true,
            request
        })
    }

    else if (purpose === "delete") {

        const request = await Request.findOne({ sender: req.user._id, receiver: userId }).populate("sender receiver");

        return res.status(200).json({
            success: true,
            request
        })
    }

    return res.status(400).json({
        success: false,
        message: "No request fetched from purpose"
    })

})

