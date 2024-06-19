import express from "express"
import { isAuthenticated } from "../middleware/auth.js";

import { attachmentsMulter } from "../middleware/multer.js";
import sendMessage from "../controllers/messageController.js";


const messageRouter = express.Router();

messageRouter.route("/message/:id").post(isAuthenticated, sendMessage);


export default messageRouter;
