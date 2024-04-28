const userModel = require("../models/userModel")
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwtToken');


exports.registerUser = async (req, res, next) => {

    try {
        const { name, email, username, password } = req.body;

        const user = await userModel.create({
            name,
            email,
            username,
            password
        });

        sendToken(user, 201, res);

        if (!user) {
            // Handle user creation failure
            return next(new ErrorHandler("user creation failed", 500));
        }

    } catch (error) {
        console.log("User not created", error.message);
        res.status(500).json({
            "message": `User not created due to ${error.message}`,
            "error": error.message
        })
    }
}

exports.loginUser = async function (req, res, next) {

    try {

        // const { email, password } = req.body;
        const { username, password } = req.body;

        // checking if user has given password and email both

        if (!username || !password) {
            return next(new ErrorHandler("Please Enter Username & Password", 400));
        }

        const user = await userModel.findOne({ username }).select("+password");

        if (!user) {
            return next(new ErrorHandler("Invalid username or password", 401));
        }

        const isPasswordMatched = await user.comparePassword(password);

        if (!isPasswordMatched) {
            return next(new ErrorHandler("Invalid email or password", 401));
        }

        sendToken(user, 200, res);

    } catch (error) {
        console.log("user login failed", error.message);
        res.json({
            "message": `User not logged in due to ${error.message}`,
            "error": error.message
        })
    }
}

exports.logoutUser = (req, res) => {

    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        });
        res.json({
            status: "success",
            message: "Logged out successfully"
        })

    } catch (error) {
        console.log("error occured: ", error);
    }
}

//Get user Details
exports.getUserDetails = async function (req, res, next) {
    try {
        const user = await userModel.findById(req.user.id);

        res.status(200).json({
            status: "success",
            message: "user found",
            user
        })

    } catch (error) {
        console.log("error in getUserDetails:", error);
    }
}