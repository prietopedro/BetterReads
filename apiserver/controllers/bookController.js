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
      id: userBooks.find(userbook => userbook.googleID === book.id)?.id,
      thumbnail: book.volumeInfo?.imageLinks?.thumbnail,
      title: book.volumeInfo?.title,
      authors: book.volumeInfo?.authors || ["Unknown"],
      average_rating: book.volumeInfo?.averageRating,
      ISBN10: book.volumeInfo?.industryIdentifiers?.find(x => x.type === "ISBN_10")?.identifier,
      favorited: userBooks.find(userbook => userbook.googleID === book.id)?.favorited || false,
      status: userBooks.find(userbook => userbook.googleID === book.id)?.status || null,
      googleID: book.id,
      rating: userBooks.find(userbook => userbook.googleID === book.id)?.rating || null
    }
  })
  // Searh User books 

  // Map UserBook data to the google books api
  return res.status(201).json({
      status: 'success',
      totalItems,
      data: myBooks,
      page: page
  })
})

exports.getBook = catchAsync(async (req, res) => {
  // Query the books from google books api
  const id = req.params.id
  const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
  const book = await response.json()

  let userBook = {};
  if(req.user){
    userBook = await await Book.findOne({
      'googleID': book.id,
      'user': req.user
    })
  }
  console.log(book);

  const responseBook = {
      id: userBook?.id,
      thumbnail: book.volumeInfo?.imageLinks?.thumbnail,
      title: book.volumeInfo?.title,
      authors: book.volumeInfo?.authors || ["Unknown"],
      average_rating: book.volumeInfo?.averageRating,
      ISBN10: book.volumeInfo?.industryIdentifiers?.find(x => x.type === "ISBN_10")?.identifier,
      favorited: userBook?.favorited || false,
      status: userBook?.status || null,
      googleID: book.id,
      rating: userBook?.rating || null,
      subtitle: book.volumeInfo?.subtitle,
      description: book.volumeInfo?.description,
      publisher: book.volumeInfo?.publisher,
      ISBN13: book.volumeInfo?.industryIdentifiers?.find(x => x.type === "ISBN_13")?.identifier,
      length: book.volumeInfo?.pageCount,
      categories: book.volumeInfo?.categories
    }
  console.log(responseBook);
 
  return res.status(201).json({
      status: 'success',
      data: {book: responseBook}
  })
})