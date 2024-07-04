import express from "express"
import { isAuthenticated } from "../middleware/auth.js";
import { myNotifications, updateReadReceipt } from "../controllers/notificationController.js";

const notificationRouter = express.Router();

notificationRouter.route("/my-notifications").get(isAuthenticated, myNotifications);
notificationRouter.route("/update/read-receipt").get(isAuthenticated, updateReadReceipt);


export { notificationRouter };