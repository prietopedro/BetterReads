import mongoose from "mongoose";
import { IBook } from "./bookModel.js";

export interface IShelf extends Document {
    _id: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    name: string;
    books: mongoose.Types.ObjectId[] | IBook[];
    save: () => Promise<any>
  }

const shelfSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "Shelf must belong to a user"]
    },
    name: {
        type: String,
        required: [true, "Shelf must have a name"]
    },
    books: [{
        type: mongoose.Types.ObjectId,
        ref: "Book"
    }]
})
shelfSchema.index({ user: 1, name: 1 }, { unique: true })
shelfSchema.set('toJSON', {
    virtuals: true
});
const Shelf = mongoose.model("Shelf", shelfSchema)
export default Shelf;