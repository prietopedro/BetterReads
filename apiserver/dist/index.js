"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const mongoose_1 = __importDefault(require("mongoose"));
process.on("uncaughtException", err => {
    console.error("UNHANDLED EXCEPTION! SHUTTING DOWN...");
    console.error(err.name, err.message);
    process.exit(1);
});
const constants_js_1 = require("./config/constants.js");
const errorController_js_1 = __importDefault(require("./controllers/errorController.js"));
const appError_js_1 = __importDefault(require("./utils/appError.js"));
const userRoutes_js_1 = __importDefault(require("./routes/userRoutes.js"));
const bookRoutes_js_1 = __importDefault(require("./routes/bookRoutes.js"));
const app = (0, express_1.default)();
dotenv_1.default.config();
mongoose_1.default
    .connect('mongodb://root:example@mongo:27017/backend?authSource=admin')
    .then(() => console.log('DB connection successful!'));
app.use(express_1.default.json({ limit: '10kb' }));
app.use((0, cookie_parser_1.default)());
app.use((0, express_mongo_sanitize_1.default)());
app.get("/", (req, res) => {
    res.send("WORKING");
});
app.use("/users", userRoutes_js_1.default);
app.use("/books", bookRoutes_js_1.default);
app.all("*", (req, res, next) => {
    next(new appError_js_1.default(404, `Can't find ${req.originalUrl} on this server`));
});
app.use(errorController_js_1.default);
const server = app.listen(constants_js_1.PORT, () => console.log(`Server started on port ${constants_js_1.PORT}`));
process.on("unhandledRejection", (err) => {
    console.error("UNHANDLED REJECTION! SHUTTING DOWN...");
    console.error(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
//# sourceMappingURL=index.js.map