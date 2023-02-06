const Book = require("../models/bookModel");
const catchAsync = require("../utils/catchAsync");

exports.getBooks = catchAsync(async (req, res) => {
  // Query the books from google books api
  const page = req.query.page || 0;
  const searchValue = req.query.search || "";
  const limit = req.query.limit || 10
  const url = new URL('/books/v1/volumes', 'https://www.googleapis.com')
  url.searchParams.append('q',searchValue);
  url.searchParams.append('maxResults', limit);
  url.searchParams.append('startIndex', page * limit)
  const response = await fetch(url)
  const books = await response.json()
  const totalItems = books.totalItems;

  const booksIDs = books.items.map((book) => book.id);
  let userBooks = []
  if(req.user){
    userBooks = await Book.find({
      'googleID': {$in: booksIDs},
      'user': req.user
    })
  }

  const myBooks = books.items.map((book) => {
    return {
      id: book.id,
      thumbnail: book.volumeInfo?.imageLinks?.thumbnail,
      title: book.volumeInfo?.title,
      authors: book.volumeInfo?.authors || ["Unknown"],
      average_rating: book.volumeInfo?.averageRating,
      ISBN10: book.volumeInfo?.industryIdentifiers?.find(x => x.type === "ISBN_10")?.identifier,
      favorited: userBooks.find(userbook => userbook.googleID === book.id)?.favorited || false,
      status: userBooks.find(userbook => userbook.googleID === book.id)?.status || null,
      userbookID: userBooks.find(userbook => userbook.googleID === book.id)?._id || null,
    }
  })
  // Searh User books 

  // Map UserBook data to the google books api
  return res.status(201).json({
      status: 'success',
      totalItems,
      data: myBooks
  })
})