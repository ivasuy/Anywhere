import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { acceptChumRequest, beholdUser, fetchCount, sendChumRequest } from "../controllers/requestController.js";

const requestRouter = express.Router();

requestRouter.route("/send-chum-request").put(isAuthenticated, sendChumRequest);
requestRouter.route("/accept-chum-request").put(isAuthenticated, acceptChumRequest);
requestRouter.route("/behold").put(isAuthenticated, beholdUser);
requestRouter.route("/all-count").get(isAuthenticated, fetchCount);


export { requestRouter }
