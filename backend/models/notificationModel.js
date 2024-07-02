import mongoose, { Schema, model, Types } from "mongoose";

const notificationSchema = new Schema(
    {
        user: {
            type: Types.ObjectId,
            ref: "UserModel",
            required: true,
        },
        type: {
            type: String,
            enum: ["chumRequest", "message", "upvote", "comment"],
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        read: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export const Notification = mongoose.models.Notification || model("Notification", notificationSchema);
