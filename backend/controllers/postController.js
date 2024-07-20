import { TryCatch } from "../middleware/error.js";
import { Notification } from "../models/notificationModel.js";
import { Post } from "../models/postModel.js";
import userModel from "../models/userModel.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import cloudinary from "cloudinary";

const createNewPost = TryCatch(async (req, res, next) => {
    const { caption, accessibility } = req.body;
    const files = req.files;
    const sharedWith = req.body.sharedWith




    let parsedSharedWith = JSON.parse(sharedWith);


    if (!caption && (!files || files.length === 0)) {
        return res.status(400).json({ success: false, message: "One of the caption or files must be there to create a post." });
    }

    let mediaFilesLink = [];
    if (files && files.length > 0) {
        for (const file of files) {
            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.v2.uploader.upload_stream({ resource_type: 'auto', folder: "mediaFiles" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                stream.end(file.buffer);
            });

            const fileType = file.mimetype.split('/')[0]; // 'image', 'video', 'audio', etc.

            mediaFilesLink.push({
                mediaType: fileType,
                public_id: result.public_id,
                url: result.secure_url,
            });
        }
    }

    const newPost = await Post.create({
        creator: req.user._id, // Assuming req.user is populated with the authenticated user's ID
        caption,
        sharedWith: parsedSharedWith,
        mediaFiles: mediaFilesLink,
        accessibility
    });

    // Update the user's post list
    await userModel.findByIdAndUpdate(req.user._id, {
        $push: { userPosts: newPost._id }
    });


    // console.log("post Created successfully", newPost)

    res.status(201).json({
        success: true,
        newPost
    });
});


const upvotePost = TryCatch(async (req, res, next) => {
    const { postId } = req.body;
    const loggedInUserId = req.user._id;

    const post = await Post.findById(postId);

    if (!post) {
        return res.status(404).json({ success: false, message: "Post not found" });
    }

    post.upvotes += 1;
    await post.save();

    // Create a notification for the post creator
    await Notification.create({
        user: post.creator,
        type: "upvote",
        message: `${req.user.name} upvoted your post.`,
    });

    res.status(200).json({ success: true, message: "Post upvoted successfully" });
});

export const fetchMyFeedPosts = TryCatch(async (req, res) => {

    const loggedInUserId = req.user._id;
    // Find posts where loggedInUserId is in the sharedWith array
    const posts = await Post.find({
        sharedWith: loggedInUserId,
        accessibility: "private"
    })
        // Populate the referenced fields for detailed information
        .populate('creator')
        .populate('sharedWith')
        .populate('comments.user')
        .populate('shares.user')
        .populate('savedBy')
        .sort({ dateShared: -1 });

    // Send the posts as a response
    res.status(200).json({ success: true, posts });


})

export const fetchAllUserPosts = TryCatch(async (req, res) => {

    const userId = req.body.id;

    const privatePosts = await Post.find({
        creator: userId,
        accessibility: "private"
    })
        .populate('sharedWith')
        .populate('comments.user')
        .populate('shares.user')
        .populate('savedBy')
        .sort({ dateShared: -1 });

    const publicPosts = await Post.find({
        creator: userId,
        accessibility: "public"
    })
        .populate('sharedWith')
        .populate('comments.user')
        .populate('shares.user')
        .populate('savedBy')
        .sort({ dateShared: -1 });

    res.status(200).json({
        success: true,
        privatePosts,
        publicPosts
    })

})


export { createNewPost, upvotePost };
