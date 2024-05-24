import express from "express"
import { isAuthenticated } from "../middleware/auth.js";
import { getMyChat, newGroupChat } from "../controllers/chatController.js";

const chatRouter = express.Router();

chatRouter.use(isAuthenticated);

chatRouter.post("/new-group", newGroupChat);
chatRouter.get("/my-chat", getMyChat);

export default chatRouter;