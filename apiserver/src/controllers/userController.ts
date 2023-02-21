import { NextFunction, Response } from "express";

import { IShelf } from "../models/shelfModel";
import { ProtectedRequest } from "./authController";
import Book, { IBook } from "../models/bookModel";
import Shelf from "../models/shelfModel";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";

const me = (req: ProtectedRequest, res: Response) => {
    return res.status(200).json({
        status: "success",
        data: {
            user: req.user
        }
    })
}

const getUserBooks = catchAsync( async (req: ProtectedRequest, res: Response) => {
    const books = await Book.find({user: req.user})
    return res.status(200).json({
        status: "success",
        data: {
            books: books
        }
    })
})

const addUserBook = catchAsync( async (req: ProtectedRequest, res: Response) => {
    const response = await fetch('https://www.googleapis.com/books/v1/volumes/'+req.body.googleID);
    const googleBook = await response.json();
    let book = await Book.create({
        user: req.user, 
        rating: req.body.rating,
        favorited: req.body.favorited, 
        status: req.body.status, 
        googleID: req.body.googleID, 
        title: googleBook.volumeInfo?.title,
        authors: googleBook.volumeInfo?.authors || [],
        average_rating: googleBook.volumeInfo?.averageRating,
        thumbnail: googleBook.volumeInfo?.imageLinks?.thumbnail
    })
    console.log(book)
    return res.status(200).json({
        status: "success",
        data: {
            book: book
        }
    })
})

const editUserBook = catchAsync(async (req: ProtectedRequest, res: Response, next:NextFunction) => {
    let book = await Book.findById<IBook>(req.params.id);
    if(!book) return next(new AppError(404, "No Userbook with this id found"));
    if(!req.user || !book.user!.equals(req.user._id)) return next(new AppError(403, "You can not edit someone elses book"));
    if(req.body.favorited !== undefined) book.favorited = req.body.favorited;
    if(req.body.status) book.status = req.body.status;
    if(req.body.rating) book.rating = req.body.rating;
    await book.save();
    return res.status(200).json({
        status: "success",
        data: {
            book: book
        }
    })
})

const getUserShelves = catchAsync( async (req:ProtectedRequest, res: Response) => {
    const shelves = await Shelf.find({user: req.user})
    return res.status(200).json({
        status: "success",
        data: {
            shelves
        }
    })
})

const addShelf = catchAsync( async (req: ProtectedRequest, res: Response) => {
    const shelf = await Shelf.create({user: req.user, name: req.body.name, })
    return res.status(200).json({
        status: "success",
        data: {
            shelf
        }
    })
})

const deleteBook = catchAsync( async (req: ProtectedRequest, res: Response, next:NextFunction) => {
   const bookID = req.params.id;
   const book = await Book.findById<IBook>(bookID)
   if(!book || !req.user || !book.user._id.equals(req.user._id)) return next(new AppError(403, "Must be the owner of the book to delete it"));
   await Book.deleteOne({_id: bookID})
   return res.status(200).json({
    status: "success",
    data: {
        book
    }
})
})

const editShelf = catchAsync( async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    const shelfID = req.params.id;
    
    const shelf = await Shelf.findById<IShelf>(shelfID);
    // console.log(shelf);
    if(!req.user || !shelf || !shelf.user._id.equals(req.user._id))  return next(new AppError(403, "Must be the owner of the shelf to edit it"));
    if(req.body.books !== undefined){
        const books = await Book.find<IBook>({
            '_id': {$in: req.body.books},
            'user': req.user
        })
        shelf.books = books;
    }
    if(req.body.name) shelf.name = req.body.name
    console.log(shelf)
    await shelf.save()
    shelf.books = shelf.books.map(x => x._id)
    return res.status(200).json({
        status: "success",
        data: {
            shelf
        }
    })
})

const deleteShelf = catchAsync( async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    const shelfID = req.params.id;
    
    const shelf = await Shelf.findById<IShelf>(shelfID);
    if(!req.user || !shelf || !shelf.user._id.equals(req.user._id))  return next(new AppError(403, "Must be the owner of the shelf to delete it"));
    
    await Shelf.deleteOne({_id: shelfID})
    return res.status(200).json({
        status: "success",
        data: {shelf}
    })
})

export default {
    deleteShelf,
    editShelf,
    deleteBook,
    addShelf,
    getUserShelves,
    editUserBook,
    addUserBook,
    getUserBooks,
    me
}