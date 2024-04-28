const jwt = require("jsonwebtoken");
const userModel = require('../models/userModel');
const ErrorHandler = require("../utils/errorHandler");

exports.isAuthenticated = async (req, res, next) => {

    try {
        const { token } = req.cookies;

        if (!token) {
            return next(new ErrorHandler("Please Login to access this resource", 401));
        }

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decodedData);

        req.user = await userModel.findById(decodedData.id);

        next();

    } catch (error) {
        console.log("error in middleware/auth : ", error);
    }
};