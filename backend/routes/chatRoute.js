import express from "express"
import { isAuthenticated } from "../middleware/auth.js";
import { addMembers, deleteChat, getChatDetails, getMessages, getMyGroupChats, getMyGroups, getMySingleChats, leaveGroup, newGroupChat, newSingleChat, removeMembers, renameGroup, sendAttachment } from "../controllers/chatController.js";
import { attachmentsMulter } from "../middleware/multer.js";

const chatRouter = express.Router();

chatRouter.use(isAuthenticated);

chatRouter.post("/new-group", newGroupChat);
// chatRouter.get("/my-chat", getMyChat);
chatRouter.get("/my-groups", getMyGroups);
chatRouter.put("/add-members", addMembers);
chatRouter.put("/remove-members", removeMembers);
chatRouter.delete("/leave/:id", leaveGroup);
chatRouter.post("/message", attachmentsMulter, sendAttachment);
chatRouter.get("/message/:id", getMessages);

chatRouter.get("/chats/single", getMySingleChats);
chatRouter.get("/chats/groups", getMyGroupChats);

chatRouter.route("/details/:id").get(getChatDetails).put(renameGroup).delete(deleteChat)

chatRouter.put("/new-single-chat", newSingleChat);

export default chatRouter;