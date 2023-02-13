import mongoose from "mongoose";

export interface IBook extends Document {
    _id: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    rating: number;
    favorited: boolean
    status: string;
    googleID: string;
    title: string;
    thumbnail: string;
    authors: string;
    average_rating: number;
    save: () => Promise<any>
  }

const bookSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "Book must belong to a user"]
    },
    rating: Number,
    favorited: Boolean,
    status: {
        type: String,
        enum: ["planned", "reading", "finished"],
        default: "planned"
    },
    googleID: {
        type: String,
        required: [true, "Book needs a google ID"]
    },
    title: String,
    thumbnail: String,
    authors: String,
    average_rating: Number,
})
bookSchema.index({ user: 1, googleID: 1 }, { unique: true })
bookSchema.set('toJSON', {
    virtuals: true
});
const Book = mongoose.model("Book", bookSchema);
export default Book;