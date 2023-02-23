import mongoose from "mongoose";
import bcryptjs from "bcryptjs"

export interface IBook extends Document {
    _id: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    rating: number;
    favorited: boolean
    status: string;
    googleID: string;
    title: string;
    thumbnail: string;
    authors: string[];
    average_rating: number;
    save: () => Promise<any>
  }

const OTPSchema = new mongoose.Schema({
    OTP: {type: String, required: true},
    createdAt: Date,
    expiresAt: Date
})
OTPSchema.pre('save', async function (next) {
    if (!this.isModified('OTP')) return next();
    this.OTP = await bcryptjs.hash(this.OTP, 12)
})
OTPSchema.methods.correctOTP = async function (candidateOTP: string, OTP: string) {
    return await bcryptjs.compare(candidateOTP, OTP)
}
const OTP = mongoose.model("OTP", OTPSchema);
export default OTP;