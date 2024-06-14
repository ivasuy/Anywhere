import express from "express";
import multer from "multer"

import { isAuthenticated } from "../middleware/auth.js";
import { createNewMediaPost } from "../controllers/postController.js";

import { attachmentsMulter } from "../middleware/multer.js";


const postRouter = express.Router();

// postRouter.route("/new-post/media").post(isAuthenticated, createNewMediaPost);
postRouter.route("/new-post/media").post(isAuthenticated, attachmentsMulter, createNewMediaPost);

export { postRouter };