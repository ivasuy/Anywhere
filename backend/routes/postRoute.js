import express from "express";
import multer from "multer"

import { isAuthenticated } from "../middleware/auth.js";
import { createNewPost, fetchAllUserPosts, fetchMyFeedPosts } from "../controllers/postController.js";

import { attachmentsMulter } from "../middleware/multer.js";


const postRouter = express.Router();

// postRouter.route("/new-post/media").post(isAuthenticated, createNewMediaPost);
postRouter.route("/new-post").post(isAuthenticated, attachmentsMulter, createNewPost);
postRouter.route("/myfeed/posts").get(isAuthenticated, fetchMyFeedPosts);
postRouter.route("/user-profile/posts").put(isAuthenticated, fetchAllUserPosts);

export { postRouter };