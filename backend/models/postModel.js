
import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
    // User who created the post
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel', // Assuming you have a User model
        required: true,
    },
    accessibility: {
        type: String,
        enum: ['private', 'public'],
        required: true,
        default: 'public'
    },
    mediaFiles: [
        {
            mediaType: {
                type: String,
            }, // You can store file URLs or paths here
            public_id: {
                type: String,
                // required: true,
            },
            url: {
                type: String,
                // required: true,
            },
        },
    ],
    caption: {
        type: String,
        required: true,
    },
    upvotes: {
        type: Number,
        default: 0,
    },
    downvotes: {
        type: Number,
        default: 0,
    },
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'UserModel',
            },
            text: String,
            date: {
                type: Date,
                default: Date.now,
            },
            upvotes: {
                type: Number,
                default: 0,
            },
            downvotes: {
                type: Number,
                default: 0,
            },

        },
    ],
    sharedWith: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserModel',
        },
    ],
    shares: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'UserModel',
            },
            date: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    savedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserModel',
        },
    ],
    dateShared: {
        type: Date,
        default: Date.now,
    },
});

export const Post = mongoose.model('Post', postSchema);

// module.exports = Post;
