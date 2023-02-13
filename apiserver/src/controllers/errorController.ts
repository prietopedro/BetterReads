import {  NextFunction, Request, Response} from "express";
import AppError from "../utils/appError";

interface DuplicateFieldDBError extends AppError {
    code: number
}
interface CastErrorDB extends AppError {
    path: string;
    value: string;
}
interface ValidationErrorDB extends AppError {
    errors: {message: string}[]
}

const handleCastErrorDB = (err: CastErrorDB) => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(400,message);
};

const handleDuplicateFieldsDB = (err: DuplicateFieldDBError) => {
    console.log(err)
    let reg = err.message.match(/(["'])(\\?.)*?\1/);
    let value = reg && reg.length ? reg[0] : ""
    let message;
    if(value && value.indexOf("@") !== -1) message = "User with this email address already exist"
    else message = `Duplicate field value: ${value}. Please use another value!`;
    return new AppError(400, message);
};

const handleValidationErrorDB = (err: ValidationErrorDB) => {
    const errors = Object.values(err.errors).map(el => el.message);

    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(400, message);
};

const handleJWTError = () =>
    new AppError(401,'Invalid token. Please log in again!');

const handleJWTExpiredError = () =>
    new AppError(401,'Your token has expired! Please log in again.');

const sendErrorDev = (err: AppError, req: Request, res: Response) => {
    return res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
};

const sendErrorProd = (err: AppError, req: Request, res: Response) => {
    // A) Operational, trusted error: send message to client
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    }
    // B) Programming or other unknown error: don't leak error details
    // 1) Log error
    console.error('ERROR 💥', err);
    // 2) Send generic message
    return res.status(500).json({
        status: 'error',
        message: 'Something went very wrong!'
    });
};

export default (err: AppError , req: Request, res: Response, next:NextFunction) => {
    // console.log(err.stack);

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, req, res);
    } else if (process.env.NODE_ENV === 'production') {
        let error = { ...err };
        error.message = err.message;

        if (error.name === 'CastError') error = handleCastErrorDB(error as CastErrorDB);
        if ((error as DuplicateFieldDBError).code === 11000) error = handleDuplicateFieldsDB(error as DuplicateFieldDBError);
        if (error.name === 'ValidationError')
            error = handleValidationErrorDB(error as ValidationErrorDB);
        if (error.name === 'JsonWebTokenError') error = handleJWTError();
        if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

        sendErrorProd(error, req, res);
    }
};