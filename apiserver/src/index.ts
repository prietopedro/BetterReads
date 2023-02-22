import express from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import mongoSanitize from "express-mongo-sanitize";
import session from "express-session";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";

process.on("uncaughtException", err => {
    console.error("UNHANDLED EXCEPTION! SHUTTING DOWN...")
    console.error(err.name, err.message)
    process.exit(1)
})

import { PORT, MONGO_DB_URL, SESSION_SECRET } from "./config/constants.js";
import globalErrorHandler from "./controllers/errorController.js";
import AppError from "./utils/appError.js";
import userRouter from "./routes/userRoutes.js";
import bookRouter from "./routes/bookRoutes.js";

const app = express();
dotenv.config();


mongoose
    .connect(MONGO_DB_URL)
    .then(() => {
        app.use(express.json({ limit: '10kb' }))
app.use(cookieParser())
app.use(mongoSanitize())

app.get("/", (req, res) => {
    res.send("WORKING")
})
app.use("/users", userRouter)
app.use("/books", bookRouter)
app.all("*", (req, res, next) => {
    next(new AppError(404, `Can't find ${req.originalUrl} on this server`))
})

app.use(globalErrorHandler);

const server = app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

process.on("unhandledRejection", (err: Error) => {
    console.error("UNHANDLED REJECTION! SHUTTING DOWN...")
    console.error(err.name, err.message)
    server.close(() => {
        process.exit(1)
    })

})
    });
