const express = require("express");
const errorMiddleware = require("./middleware/error");
const userRouter = require("./routes/userRoute");

const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors({
    origin: "http://localhost:3000", // Add your frontend URL here
    credentials: true, // Allow cookies to be sent with the request
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
}));

// app.use("api/v1/", dataRouter)
app.use("/api/v1", userRouter)

app.use(errorMiddleware);

module.exports = app;