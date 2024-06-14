import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { acceptFriendRequest, getAllNotifications, sendFriendRequest } from "../controllers/requestController.js";

const requestRouter = express.Router();

requestRouter.route("/send-chum-request").put(isAuthenticated, sendFriendRequest);
requestRouter.route("/accept-chum-request").put(isAuthenticated, acceptFriendRequest);
requestRouter.route("/notifications").get(isAuthenticated, getAllNotifications);

export { requestRouter }
