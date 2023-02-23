"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const OTPSchema = new mongoose_1.default.Schema({
    OTP: { type: String, required: true },
    createdAt: Date,
    expiresAt: Date
});
OTPSchema.pre('save', async function (next) {
    if (!this.isModified('OTP'))
        return next();
    this.OTP = await bcryptjs_1.default.hash(this.OTP, 12);
});
OTPSchema.methods.correctOTP = async function (candidateOTP, OTP) {
    return await bcryptjs_1.default.compare(candidateOTP, OTP);
};
const OTP = mongoose_1.default.model("OTP", OTPSchema);
exports.default = OTP;
//# sourceMappingURL=OTPModel.js.map