const express = require("express");
const { registerUser, loginUser, logoutUser, getUserDetails } = require("../controllers/userController");
const userRouter = express.Router();
const { isAuthenticated } = require("../middleware/auth")


userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").get(logoutUser);
userRouter.route("/me").get(isAuthenticated, getUserDetails);


module.exports = userRouter;
