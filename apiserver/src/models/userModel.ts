import mongoose from "mongoose"
import bcryptjs from "bcryptjs"

export interface IUser extends Document {
    _id: mongoose.Types.ObjectId;
    email: string;
    password: string;
    books: mongoose.Types.ObjectId[];
    correctPassword: (candidatePassword: string, userPassword: string) => Promise<boolean>;
  }

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
    },
    username: {
        type: String,
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
            type: mongoose.Types.ObjectId,
            ref: "Book"
        }
    ],
    shelves: [{
        type: mongoose.Types.ObjectId,
        ref: "Shelf"
    }]
})
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcryptjs.hash(this.password, 12)
})
userSchema.methods.correctPassword = async function (candidatePassword: string, userPassword: string) {
    return await bcryptjs.compare(candidatePassword, userPassword)
}
const User = mongoose.model("User", userSchema)
export default User;