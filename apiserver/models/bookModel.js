const mongoose = require("mongoose")
const bookSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
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
    }
})
bookSchema.index({ user: 1, googleID: 1 }, { unique: true })
const Book = mongoose.model("Book", bookSchema);
module.exports = Book;