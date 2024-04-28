const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    username: {
        type: String,
        required: [true, "Please Enter Your Password"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password should be greater than 8 characters"],
        select: false,
    },
    gender: {
        type: String,
        // required: [true, "Please Enter Your Gender"],
        enum: ["Male", "Female", "Others"],
    },
    dateOfBirth: {
        type: Date,
        // required: [true, "Please Enter Your Date Of Birth"],
    },
    phoneNumber: {
        type: Number,
        // required: [true, "Please Enter Your Phone Number"],
        // unique: true,
        // default: 8734599272,
        maxLength: [10, "Phone Number cannot exceed 10 digits"],
    },
    userImages: [
        {
            public_id: {
                type: String,
                // required: true,
            },
            url: {
                type: String,
                // required: true,
            },
        },
    ],
    avatar: {
        public_id: {
            type: String,
            // required: true,
        },
        url: {
            type: String,
            // required: true,
        },
    },
    role: {
        type: String,
        default: "admin",
    },

    userStatus: {
        type: String,
        default: "Active",
        enum: ["Active", "Inactive", "Suspended", "Blocked"],
    },
    location: {
        type: {
            type: String,
            enum: ["Point"],
            default: "Point",
        },
        coordinates: {
            type: [Number],
            index: "2dsphere",
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
})

// JWT Token
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        // expiresIn: process.env.JWT_EXPIRE,

    });
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

// Hashing password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model("UserModel", userSchema);