import { TryCatch } from "../middleware/error.js";
import { Post } from "../models/postModel.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import cloudinary from "cloudinary"



const createNewMediaPost = TryCatch(async (req, res, next) => {
    const { caption } = req.body;
    const files = req.files;

    if (!caption || !files || files.length === 0) {
        return res.status(400).json({ success: false, message: "Caption and files are required." });
    }

    let mediaFilesLink = [];

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

        mediaFilesLink.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
    }

    const newPost = await Post.create({
        creator: req.user._id, // Assuming req.user is populated with the authenticated user's ID
        caption,
        mediaFiles: mediaFilesLink
    });

    res.status(201).json({
        success: true,
        newPost
    });
});



export { createNewMediaPost }