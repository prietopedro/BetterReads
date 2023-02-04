const mongoose = require("mongoose")
const bcryptjs = require("bcryptjs")
const crypto = require("crypto")

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide your email"],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: 8,
        select: false
    },
    books: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Book"
        }
    ],
    shelves: [{
        type: mongoose.Schema.ObjectId,
        ref: "Shelf"
    }]
})
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcryptjs.hash(this.password, 12)
})
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcryptjs.compare(candidatePassword, userPassword)
}
const User = mongoose.model("User", userSchema)
module.exports = User;