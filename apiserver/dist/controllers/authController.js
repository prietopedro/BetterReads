"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_js_1 = __importDefault(require("../lib/emails/index.js"));
const OTPModel_js_1 = __importDefault(require("../models/OTPModel.js"));
const constants_js_1 = require("../config/constants.js");
const userModel_js_1 = __importDefault(require("../models/userModel.js"));
const appError_js_1 = __importDefault(require("../utils/appError.js"));
const catchAsync_js_1 = __importDefault(require("../utils/catchAsync.js"));
const index_js_2 = __importDefault(require("../lib/sms/index.js"));
const signToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, constants_js_1.JWT_SECRET, { expiresIn: constants_js_1.JWT_EXPIRES_IN });
};
const signup = (0, catchAsync_js_1.default)(async (req, res, next) => {
    const newUser = await userModel_js_1.default.create(req.body);
    const token = signToken(newUser._id.toString());
    newUser.password = "";
    res.cookie('jwt', token, {
        expires: new Date(Date.now() + (parseInt(constants_js_1.JWT_EXPIRES_IN.replace("d", "")) * 24 * 60 * 60 * 1000)),
        secure: process.env.NODE_ENV === "production",
        httpOnly: true
    });
    return res.status(201).json({
        status: 'success',
    });
});
const login = (0, catchAsync_js_1.default)(async (req, res, next) => {
    const { email, password, username } = req.body;
    if ((!email && !username) || !password)
        return next(new appError_js_1.default(400, "Email/Username and password required"));
    let user;
    if (email)
        user = await userModel_js_1.default.findOne({ email }).select('+password');
    else if (username)
        user = await userModel_js_1.default.findOne({ username }).select('+password');
    if (!user || !await user.correctPassword(password, user.password))
        return next(new appError_js_1.default(401, "Incorrect email or password"));
    let token = signToken(user._id.toString());
    res.cookie('jwt', token, {
        expires: new Date(Date.now() + (parseInt(constants_js_1.JWT_EXPIRES_IN.replace("d", "")) * 24 * 60 * 60 * 1000)),
        secure: process.env.NODE_ENV === "production",
        httpOnly: true
    });
    return res.status(200).json({
        status: 'success'
    });
});
const logout = (0, catchAsync_js_1.default)(async (req, res, next) => {
    res.clearCookie("jwt");
    return res.status(200).json({
        status: "success",
    });
});
const protect = (0, catchAsync_js_1.default)(async (req, res, next) => {
    req.requestTime = new Date().toISOString();
    if (!req.cookies.jwt) {
        return next(new appError_js_1.default(401, "You are not logged in! Please log in to get access"));
    }
    let token = req.cookies.jwt;
    const decoded = jsonwebtoken_1.default.verify(token, constants_js_1.JWT_SECRET);
    const user = await userModel_js_1.default.findById(decoded.id);
    if (!user)
        return next(new appError_js_1.default(401, "The user no longer exist"));
    req.user = user;
    return next();
});
const isLoggedIn = (0, catchAsync_js_1.default)(async (req, res, next) => {
    req.requestTime = new Date().toISOString();
    if (!req.cookies.jwt) {
        return next();
    }
    let token = req.cookies.jwt;
    const decoded = jsonwebtoken_1.default.verify(token, constants_js_1.JWT_SECRET);
    const user = await userModel_js_1.default.findById(decoded.id);
    if (!user)
        return next();
    req.user = user;
    return next();
});
const requestOTPVerificationCode = (0, catchAsync_js_1.default)(async (req, res, next) => {
    const { email, phone } = req.body;
    if (!email && !phone)
        return next(new appError_js_1.default(400, "Must provide an email or a phone number"));
    let user;
    if (email)
        user = await userModel_js_1.default.findOne({ email });
    else if (phone)
        user = await userModel_js_1.default.findOne({ phone });
    console.log(user);
    if (user)
        return next(new appError_js_1.default(400, "You already have an account"));
    const otpvalue = Math.floor(1000 + Math.random() * 9000);
    const newOTP = await OTPModel_js_1.default.create({
        OTP: otpvalue,
        createdAt: Date.now(),
        expiresAt: Date.now() + 50000
    });
    // BOTH WORKING
    if (email)
        index_js_1.default.sendMail(email, "Verify Your Email", `<h1>${otpvalue}</h1>`);
    else if (phone)
        index_js_2.default.sendText(phone, `${otpvalue}`);
    res.status(200).json({ sent: true, OTP: newOTP });
});
exports.default = {
    isLoggedIn,
    protect,
    logout,
    login,
    signup,
    requestOTPVerificationCode
};
//# sourceMappingURL=authController.js.map