const bcryptjs = require("bcryptjs")
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const { registerValidator, loginValidator } = require("../validators")

const register = async (req, res) => {
    try {
        console.log({ value: "HELLo" })
        delete req.body.confirmPassword
        const validationResult = registerValidator(req.body);
        if (validationResult !== true) {
            console.log(validationResult)
            res.status(400)
            throw new Error(validationResult)
        }
        const hashedPassword = await bcryptjs.hash(req.body.password, 12);
        const user = await User.create({ ...req.body, password: hashedPassword });
        user.password = undefined;
        req.session.user_id = user._id;
        req.session.save();
        return res.status(201).json({ user })

    } catch (error) {
        console.log(error.message)
    }
}

const login = asyncHandler(async (req, res) => {
    const validationResult = loginValidator(req.body);
    if (validationResult !== true) {
        res.status(400)
        throw new Error(validationResult)
    }
    const user = await User.findOne({ email: req.body.email })
    if (!user || !bcryptjs.compareSync(req.body.password, user.password)) {
        res.status(400)
        throw new Error("Wrong email or password")
    }
    user.password = undefined;
    req.session.user_id = user._id;
    return res.status(201).json({ user })
})

const logout = asyncHandler(async (req, res) => {
    delete req.session.user_id;
    res.status(200).json({ message: "Successfully logged out" })
})


module.exports = {
    register,
    login,
    logout
};