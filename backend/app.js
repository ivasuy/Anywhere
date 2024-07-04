import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import userRouter from "./routes/userRoute.js";
import locationRouter from "./routes/locationRoute.js";
import { errorMiddleware } from "./middleware/error.js";
import chatRouter from "./routes/chatRoute.js";
import { createUser } from "./seeders/userSeed.js";
import { createGroupChats, createMessagesInAChat, createSingleChats } from "./seeders/chatSeed.js";
import { postRouter } from "./routes/postRoute.js";
import { requestRouter } from "./routes/requestRoute.js";
import { notificationRouter } from "./routes/notificationRoute.js";



const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));


//seeders

// createUser(10);
// createSingleChats(20)
// createGroupChats(20);

// createMessagesInAChat("6657912720bf5b5454b22aba", 50);


app.use(cors({
    origin: "http://localhost:3000", // Add your frontend URL here
    // origin: process.env.FRONTEND_URL, // Add your frontend URL here
    credentials: true, // Allow cookies to be sent with the request
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
}));

// app.use("api/v1/", dataRouter)
app.use("/api/v1", userRouter)
app.use("/api/v1", locationRouter)
app.use("/api/v1/chat", chatRouter)
app.use("/api/v1/post", postRouter)
app.use("/api/v1/request", requestRouter)
app.use("/api/v1/notifications", notificationRouter)

app.use(errorMiddleware);

export default app;