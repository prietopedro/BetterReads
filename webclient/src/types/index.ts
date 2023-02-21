// MODELS
export type Book = {
  id: string;
  thumbnail: string;
  title: string;
  authors: string[];
  average_rating: number;
  ISBN10: string;
  favorited: boolean;
  status: string;
  googleID: string;
  rating: number;
};

export interface BookWithDetails extends Book {
  subtitle: string;
  description: string;
  publisher: string;
  ISBN13: string;
  length: number;
  categories: string[];
}

export type Shelf = {
  id: string;
  name: string;
  books: string[];
};

export type BookAction = {
  favorited?: boolean;
  status?: string;
  rating?: number;
};

// POST REQUEST BODY
export type LoginData = {
  email: string;
  password: string;
};
export type RegisterData = {
  email: string;
  password: string;
};
export interface AddUserBook extends BookAction {
  googleID: string;
}

// PUT REQUEST BODY
export interface EditUserBook extends BookAction {
  userbookID: string;
}

export type EditShelf = {
  id: string;
  name?: string;
  books?: string[];
};

// GET REQUEST PARAMS
export type FetchBooksParams = {
  page: number;
  search: string;
};

// REQUST RESPONSES
export type BookWithDetailsAxiosResponse = {
  data: { book: BookWithDetails };
};
export type BooksAxiosResponse = {
  data: Book[];
  totalItems: number;
};
export type UserBooksAxiosResponse = {
  data: { books: Book[] };
};
export type UserBookAxiosResponse = {
  data: { book: Book };
};
export type UserShelvesAxiosResponse = {
  data: { shelves: Shelf[] };
};
export type UserShelfAxiosResponse = {
  data: { shelf: Shelf };
};

// LIB Interfaces
// useInfiniteQuery
export interface InfiniteBooks {
  pages: BooksAxiosResponse[];
  pageParams: string;
}
