const Book = require("../models/bookModel");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.me = (req, res) => {
    return res.status(200).json({
        status: "success",
        data: {
            user: req.user
        }
    })
}

exports.getUserBooks = catchAsync( async (req, res) => {
    const books = await Book.find({user: req.user})
    const newBooks = []
    for(let book of books){
        console.log(book.googleID)
        const response = await fetch('https://www.googleapis.com/books/v1/volumes/' + book.googleID);
        const googleBook = await response.json();
        newBooks.push({
            id: googleBook.id,
            thumbnail: googleBook.volumeInfo?.imageLinks?.thumbnail,
            title: googleBook.volumeInfo?.title,
            authors: googleBook.volumeInfo?.authors || ["Unknown"],
            average_rating: googleBook.volumeInfo?.averageRating,
            ISBN10: googleBook.volumeInfo?.industryIdentifiers?.find(x => x.type === "ISBN_10")?.identifier,
            favorited: book.favorited,
            status: book.status,
            userbookID: book._id
        })
    }
    return res.status(200).json({
        status: "success",
        data: {
            books: newBooks
        }
    })
})

exports.addUserBook = catchAsync( async (req, res) => {
    let book = await Book.create({user: req.user, favorited: req.body.favorited, status: req.body.status, googleID: req.body.googleID})
    const response = await fetch('https://www.googleapis.com/books/v1/volumes/'+req.body.googleID);
    const googleBook = await response.json();
    book = { 
            id: googleBook.id,
            thumbnail: googleBook.volumeInfo?.imageLinks?.thumbnail,
            title: googleBook.volumeInfo?.title,
            authors: googleBook.volumeInfo?.authors || ["Unknown"],
            average_rating: googleBook.volumeInfo?.averageRating,
            ISBN10: googleBook.volumeInfo?.industryIdentifiers?.find(x => x.type === "ISBN_10")?.identifier,
            favorited: book.favorited,
            status: book.status,
            userbookID: book._id
            }
    return res.status(200).json({
        status: "success",
        data: {
            book: book
        }
    })
})

exports.editUserBook = catchAsync(async (req, res, next) => {
    let book = await Book.findById(req.params.id);
    if(!book) return next(new AppError(404, "No Userbook with this id found"));
    if(!book.user.equals(req.user._id)) return next(new AppError(403, "You can not edit someone elses book"));
    if(req.body.favorited !== null) book.favorited = req.body.favorited;
    if(req.body.status) book.status = req.body.status;
    await book.save();
   
    const response = await fetch('https://www.googleapis.com/books/v1/volumes/'+ book.googleID);
    const googleBook = await response.json();
    book = { 
            id: googleBook.id,
            thumbnail: googleBook.volumeInfo?.imageLinks?.thumbnail,
            title: googleBook.volumeInfo?.title,
            authors: googleBook.volumeInfo?.authors || ["Unknown"],
            average_rating: googleBook.volumeInfo?.averageRating,
            ISBN10: googleBook.volumeInfo?.industryIdentifiers?.find(x => x.type === "ISBN_10")?.identifier,
            favorited: book.favorited,
            status: book.status,
            userbookID: book._id
            }
    return res.status(200).json({
        status: "success",
        data: {
            book: book
        }
    })
})