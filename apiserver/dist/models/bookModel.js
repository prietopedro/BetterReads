"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bookSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Types.ObjectId,
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
});
bookSchema.index({ user: 1, googleID: 1 }, { unique: true });
bookSchema.set('toJSON', {
    virtuals: true
});
const Book = mongoose_1.default.model("Book", bookSchema);
exports.default = Book;
//# sourceMappingURL=bookModel.js.map