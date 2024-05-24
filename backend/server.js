import app from "./app.js";
// import cloudinary from "cloudinary"; // Example import, if needed
import connectDatabase from "./config/database.js";
import bodyParser from "body-parser";
import dotenv from 'dotenv';


// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
});

// Config
if (process.env.NODE_ENV !== 'production') {
    dotenv.config({ path: 'backend/config/config.env' });
}

// app.use(
//     bodyParser.json({
//         verify: function (req, res, buf) {
//             req.rawBody = buf;
//         }
//     })
// );

// app.use(bodyParser.json());

connectDatabase();


const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1);
    });
});