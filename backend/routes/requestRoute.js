import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { acceptChumRequest, beholdUser, checkBeholdUser, checkChumRequestStatus, fetchCount, myAllRequests, removeBeholdUser, sendChumRequest } from "../controllers/requestController.js";

const requestRouter = express.Router();

requestRouter.route("/send-chum-request").put(isAuthenticated, sendChumRequest);
requestRouter.route("/accept-chum-request").put(isAuthenticated, acceptChumRequest);
requestRouter.route("/behold").put(isAuthenticated, beholdUser);
requestRouter.route("/remove-behold").put(isAuthenticated, removeBeholdUser);
requestRouter.route("/check-behold").put(isAuthenticated, checkBeholdUser);
requestRouter.route("/my-requests").get(isAuthenticated, myAllRequests);
requestRouter.route("/status").get(isAuthenticated, checkChumRequestStatus);



requestRouter.route("/all-count").post(isAuthenticated, fetchCount);

export { requestRouter }