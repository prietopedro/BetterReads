import {  Request, Response, NextFunction } from "express";
import { ProtectedRequest } from "../controllers/authController";
const catchAsync = (fn: (req: Request | ProtectedRequest , res: Response, next: NextFunction) => 
Promise<Response<any>> | 
Promise<Response<any, Record<string, any>>> | 
Promise<void> |
Promise<void | Response<any, Record<string, any>>>
) => {
    return (req: Request | ProtectedRequest, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next);
    };
};
export default catchAsync;