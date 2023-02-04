const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.me = (req, res) => {
    return res.status(200).json({
        status: "success",
        data: {
            user: req.user
        }
    })
}