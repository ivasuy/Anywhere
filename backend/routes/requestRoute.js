import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { acceptChumRequest, allChumsList, beholdUser, checkBeholdUser, checkChumStatus, deleteChum, fetchCount, getPurposeRequests, myAllRequests, removeBeholdUser, sendChumRequest } from "../controllers/requestController.js";

const requestRouter = express.Router();

requestRouter.route("/send-chum-request").put(isAuthenticated, sendChumRequest);
requestRouter.route("/accept-chum-request").put(isAuthenticated, acceptChumRequest);
requestRouter.route("/behold").put(isAuthenticated, beholdUser);
requestRouter.route("/remove-behold").put(isAuthenticated, removeBeholdUser);
requestRouter.route("/check-behold").put(isAuthenticated, checkBeholdUser);
requestRouter.route("/my-requests").get(isAuthenticated, myAllRequests);
requestRouter.route("/status").put(isAuthenticated, checkChumStatus);
requestRouter.route("/purpose-request").put(isAuthenticated, getPurposeRequests);
requestRouter.route("/delete-chum").put(isAuthenticated, deleteChum)
requestRouter.route("/all-chums-list").get(isAuthenticated, allChumsList)


requestRouter.route("/all-count").post(isAuthenticated, fetchCount);

export { requestRouter }