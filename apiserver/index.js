const express = require("express")
const dotenv = require("dotenv")
const cookieParser = require('cookie-parser');
const rateLimit = require("express-rate-limit")
const helmet = require("helmet")
const mongoSanitize = require("express-mongo-sanitize")
const xss = require("xss-clean")

process.on("uncaughtException", err => {
    console.error("UNHANDLED EXCEPTION! SHUTTING DOWN...")
    console.error(err.name, err.message)
    process.exit(1)
})

const { PORT } = require("./config/constants");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError")
const userRouter = require("./routes/userRoutes")
const mongoose = require("mongoose");
const authController = require("./controllers/authController")

const app = express();
dotenv.config();


mongoose
    .connect('mongodb://root:example@mongo:27017/backend?authSource=admin')
    .then(() => console.log('DB connection successful!'));
app.use(express.json({ limit: '10kb' }))
app.use(rateLimit({
    max: 1000,
    windowMs: 60 * 60 * 1000,
    message: "Too many reequests from this IP, please try again in an hour!"
}))
app.use(cookieParser())
app.use(helmet());
app.use(mongoSanitize())
app.use(xss())
app.get("/", (req, res) => {
    res.send("WORKING")
})
app.use("/users", userRouter)
app.all("*", (req, res, next) => {
    next(new AppError(404, `Can't find ${req.originalUrl} on this server`))
})

app.use(globalErrorHandler);

const server = app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

process.on("unhandledRejection", err => {
    console.error("UNHANDLED REJECTION! SHUTTING DOWN...")
    console.error(err.name, err.message)
    server.close(() => {
        process.exit(1)
    })

})