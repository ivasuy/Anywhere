import { ErrorHandler } from '../utils/errorHandler.js';  // Corrected import statement
import { NEW_REQUEST } from "../constants/events.js";
import { TryCatch } from "../middleware/error.js";
import { Request } from "../models/requestModel.js"
import { emitEvent } from "../utils/apifeatures.js"
import userModel from '../models/userModel.js';
import { Flag } from '@mui/icons-material';


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
        return next(
            new ErrorHandler("You are not authorized to accept this request", 401)
        );

    if (!accept) {
        await request.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Friend Request Rejected",
        });
    }

    const members = [request.sender._id, request.receiver._id];

    await Promise.all([
        Chat.create({
            members,
            name: `${request.sender.name}-${request.receiver.name}`,
        }),
        request.deleteOne(),
    ]);

    emitEvent(req, REFETCH_CHATS, members);

    return res.status(200).json({
        success: true,
        message: "Friend Request Accepted",
        senderId: request.sender._id,
    });
});

export const beholdUser = async (req, res, next) => {
    const { userId } = req.body;

    console.log("userId form backend", userId);

    if (!userId) {
        return res.status(400).json({
            success: false,
            message: 'please provide UserId'
        })
    }

    const user = await userModel.findById(userId);

    if (!user) return next(new ErrorHandler("User not found", 400));

    if (!user.beholdList.includes(userId)) {
        userModel.beholdList.push((userId));
    }

    else if (user.beholdList.includes(userId)) {
        return res.status(400).json({
            success: false,
            flag: false,
            message: 'User already in behold list.',
        });
    }

    await user.save();

    res.status(200).json({
        success: true,
        message: "User added to behold list successfully",
        user
    })


}
