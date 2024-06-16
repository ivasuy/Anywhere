import { TryCatch } from "../middleware/error.js";
import { Post } from "../models/postModel.js";
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

    console.log("post Created successfully", newPost)

    res.status(201).json({
        success: true,
        newPost
    });
});

export { createNewPost };
