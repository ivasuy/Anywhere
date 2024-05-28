import express from "express"
import { isAuthenticated } from "../middleware/auth.js";
import { addMembers, getMyChat, getMyGroups, newGroupChat, removeMembers } from "../controllers/chatController.js";

const chatRouter = express.Router();

chatRouter.use(isAuthenticated);

chatRouter.post("/new-group", newGroupChat);
chatRouter.get("/my-chat", getMyChat);
chatRouter.get("/my-groups", getMyGroups);
chatRouter.put("/add-members", addMembers);
chatRouter.put("/remove-members", removeMembers);

export default chatRouter;