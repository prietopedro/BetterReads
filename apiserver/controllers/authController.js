const jwt = require("jsonwebtoken")

const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
}

exports.signup = catchAsync(async (req, res) => {
    const newUser = await User.create(req.body);
    const token = signToken(newUser._id)
    newUser.password = undefined;
    res.cookie('jwt', token, {
        expires: new Date(Date.now() + (parseInt(process.env.JWT_EXPIRES_IN.replace("d", "")) * 24 * 60 * 60 * 1000)),
        secure: process.env.NODE_ENV === "production",
        httpOnly: true
    })
    return res.status(201).json({
        status: 'success',
    })
})

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) return next(new AppError(400, "Email and password required"));
    const user = await User.findOne({ email }).select('+password')
    if (!user || !await user.correctPassword(password, user.password)) return next(new AppError(401, "Incorrect email or password"));
    let token = signToken(user._id);
    res.cookie('jwt', token, {
        expires: new Date(Date.now() + (parseInt(process.env.JWT_EXPIRES_IN.replace("d", "")) * 24 * 60 * 60 * 1000)),
        secure: process.env.NODE_ENV === "production",
        httpOnly: true
    })
    return res.status(200).json({
        status: 'success'
    })
})

exports.protect = catchAsync(async (req, res, next) => {
    req.requestTime = new Date().toISOString();
    if (!req.cookies.jwt) {
        return next(new AppError(401, "You are not logged in! Please log in to get access"))
    }
    let token = req.cookies.jwt;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return next(new AppError(401, "The user no longer exist"))
    req.user = user;
    next()
})


