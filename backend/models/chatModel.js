import mongoose, { Schema, model, Types } from "mongoose";

const schema = new Schema(
    {
        name: {
            type: String,
            // required: true,
        },
        groupChat: {
            type: Boolean,
            default: false,
        },
        creator: {
            type: Types.ObjectId,
            ref: "UserModel",
        },
        members: [
            {
                type: Types.ObjectId,
                ref: "UserModel",
            },
        ],
    },
    {
        timestamps: true,
    }
);

export const Chat = mongoose.models.Chat || model("Chat", schema);