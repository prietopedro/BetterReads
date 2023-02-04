const mongoose = require("mongoose")
const shelfSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Shelf must belong to a user"]
    },
    name: {
        type: String,
        required: [true, "Shelf must have a name"]
    },
    books: [{
        type: mongoose.Schema.ObjectId,
        ref: "Book"
    }]
})
shelfSchema.index({ user: 1, name: 1 }, { unique: true })
const Shelf = mongoose.model("Shelf", shelfSchema)
module.exports = Shelf;