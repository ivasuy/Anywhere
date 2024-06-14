import express from "express";
import { registerUser, loginUser, logoutUser, getUserDetails, searchUser } from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/auth.js";
import { singleAvatar } from "../middleware/multer.js";

const userRouter = express.Router();



userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").get(logoutUser);
userRouter.route("/me").get(isAuthenticated, getUserDetails);
userRouter.route("/search-user").get(isAuthenticated, searchUser);



//use multer in whichever component files uploading is used

export default userRouter;
