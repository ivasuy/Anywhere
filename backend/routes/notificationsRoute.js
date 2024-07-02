import express from "express"
import { isAuthenticated } from "../middleware/auth.js";
import { allNotifications } from "../controllers/notificationsController.js";



const notificationsRouter = express.Router();

notificationsRouter.route("/notifications").post(isAuthenticated, allNotifications);


export default messageRouter;
