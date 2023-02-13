"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bookModel_1 = __importDefault(require("../models/bookModel"));
const shelfModel_1 = __importDefault(require("../models/shelfModel"));
const appError_1 = __importDefault(require("../utils/appError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const me = (req, res) => {
    return res.status(200).json({
        status: "success",
        data: {
            user: req.user
        }
    });
};
const getUserBooks = (0, catchAsync_1.default)(async (req, res) => {
    const books = await bookModel_1.default.find({ user: req.user });
    return res.status(200).json({
        status: "success",
        data: {
            books: books
        }
    });
});
const addUserBook = (0, catchAsync_1.default)(async (req, res) => {
    const response = await fetch('https://www.googleapis.com/books/v1/volumes/' + req.body.googleID);
    const googleBook = await response.json();
    let book = await bookModel_1.default.create({
        user: req.user,
        rating: req.body.rating,
        favorited: req.body.favorited,
        status: req.body.status,
        googleID: req.body.googleID,
        title: googleBook.volumeInfo?.title,
        authors: googleBook.volumeInfo?.authors?.length ? googleBook.volumeInfo?.authors[0] : "Unknown",
        average_rating: googleBook.volumeInfo?.averageRating,
        thumbnail: googleBook.volumeInfo?.imageLinks?.thumbnail
    });
    console.log(book);
    return res.status(200).json({
        status: "success",
        data: {
            book: book
        }
    });
});
const editUserBook = (0, catchAsync_1.default)(async (req, res, next) => {
    let book = await bookModel_1.default.findById(req.params.id);
    if (!book)
        return next(new appError_1.default(404, "No Userbook with this id found"));
    if (!req.user || !book.user.equals(req.user._id))
        return next(new appError_1.default(403, "You can not edit someone elses book"));
    if (req.body.favorited !== undefined)
        book.favorited = req.body.favorited;
    if (req.body.status)
        book.status = req.body.status;
    if (req.body.rating)
        book.rating = req.body.rating;
    await book.save();
    return res.status(200).json({
        status: "success",
        data: {
            book: book
        }
    });
});
const getUserShelves = (0, catchAsync_1.default)(async (req, res) => {
    const shelves = await shelfModel_1.default.find({ user: req.user });
    return res.status(200).json({
        status: "success",
        data: {
            shelves
        }
    });
});
const addShelf = (0, catchAsync_1.default)(async (req, res) => {
    const shelf = await shelfModel_1.default.create({ user: req.user, name: req.body.name, });
    return res.status(200).json({
        status: "success",
        data: {
            shelf
        }
    });
});
const deleteBook = (0, catchAsync_1.default)(async (req, res, next) => {
    const bookID = req.params.id;
    const book = await bookModel_1.default.findById(bookID);
    if (!book || !req.user || !book.user._id.equals(req.user._id))
        return next(new appError_1.default(403, "Must be the owner of the book to delete it"));
    await bookModel_1.default.deleteOne({ _id: bookID });
    return res.status(200).json({
        status: "success",
        data: {
            book
        }
    });
});
const editShelf = (0, catchAsync_1.default)(async (req, res, next) => {
    const shelfID = req.params.id;
    const shelf = await shelfModel_1.default.findById(shelfID);
    // console.log(shelf);
    if (!req.user || !shelf || !shelf.user._id.equals(req.user._id))
        return next(new appError_1.default(403, "Must be the owner of the shelf to edit it"));
    if (req.body.books !== undefined) {
        const books = await bookModel_1.default.find({
            '_id': { $in: req.body.books },
            'user': req.user
        });
        shelf.books = books;
    }
    if (req.body.name)
        shelf.name = req.body.name;
    console.log(shelf);
    await shelf.save();
    shelf.books = shelf.books.map(x => x._id);
    return res.status(200).json({
        status: "success",
        data: {
            shelf
        }
    });
});
const deleteShelf = (0, catchAsync_1.default)(async (req, res, next) => {
    const shelfID = req.params.id;
    const shelf = await shelfModel_1.default.findById(shelfID);
    if (!req.user || !shelf || !shelf.user._id.equals(req.user._id))
        return next(new appError_1.default(403, "Must be the owner of the shelf to delete it"));
    await shelfModel_1.default.deleteOne({ _id: shelfID });
    return res.status(200).json({
        status: "success",
        data: { shelf }
    });
});
exports.default = {
    deleteShelf,
    editShelf,
    deleteBook,
    addShelf,
    getUserShelves,
    editUserBook,
    addUserBook,
    getUserBooks,
    me
};
//# sourceMappingURL=userController.js.map