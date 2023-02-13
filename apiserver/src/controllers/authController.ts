import {Request, Response, NextFunction} from "express"
import jwt from "jsonwebtoken";

import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/constants.js";
import User, { IUser } from "../models/userModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

const signToken = (id: string) => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

export interface ProtectedRequest extends Request {
    requestTime?: string;
    user?: IUser
}
interface JwtPayload {
    id: string
  }
const signup = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const newUser = await User.create(req.body);
    const token = signToken(newUser._id.toString())
    newUser.password = "";
    res.cookie('jwt', token, {
        expires: new Date(Date.now() + (parseInt(JWT_EXPIRES_IN.replace("d", "")) * 24 * 60 * 60 * 1000)),
        secure: process.env.NODE_ENV === "production",
        httpOnly: true
    })
    return res.status(201).json({
        status: 'success',
    })
})

const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) return next(new AppError(400, "Email and password required"));
    const user = await User.findOne<IUser>({ email }).select('+password')
    if (!user || !await user.correctPassword(password, user.password)) return next(new AppError(401, "Incorrect email or password"));
    let token = signToken(user._id.toString());
    res.cookie('jwt', token, {
        expires: new Date(Date.now() + (parseInt(JWT_EXPIRES_IN.replace("d", "")) * 24 * 60 * 60 * 1000)),
        secure: process.env.NODE_ENV === "production",
        httpOnly: true
    })
    return res.status(200).json({
        status: 'success'
    })
})

const logout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("jwt");
    return res.status(200).json({
        status: "success",
    })
})

const protect = catchAsync(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    req.requestTime = new Date().toISOString();
    if (!req.cookies.jwt) {
        return next(new AppError(401, "You are not logged in! Please log in to get access"))
    }
    let token = req.cookies.jwt;

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    const user = await User.findById<IUser>(decoded.id);
    if (!user) return next(new AppError(401, "The user no longer exist"))
    req.user = user;
    return next()
})

const isLoggedIn = catchAsync(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    req.requestTime = new Date().toISOString();
    if (!req.cookies.jwt) {
        return next()
    }
    let token = req.cookies.jwt;
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    const user = await User.findById<IUser>(decoded.id);
    if (!user) return next()
    req.user = user;
    return next()
})

export default {
    isLoggedIn,
    protect,
    logout,
    login,
    signup
}

