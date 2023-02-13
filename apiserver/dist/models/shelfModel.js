"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const shelfSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "User",
        required: [true, "Shelf must belong to a user"]
    },
    name: {
        type: String,
        required: [true, "Shelf must have a name"]
    },
    books: [{
            type: mongoose_1.default.Types.ObjectId,
            ref: "Book"
        }]
});
shelfSchema.index({ user: 1, name: 1 }, { unique: true });
shelfSchema.set('toJSON', {
    virtuals: true
});
const Shelf = mongoose_1.default.model("Shelf", shelfSchema);
exports.default = Shelf;
//# sourceMappingURL=shelfModel.js.map