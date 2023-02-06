/* eslint-disable no-param-reassign */
import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../store';
import { changeBook } from './booksSlice';

type EditUserBookParams = {
  favorited?: boolean;
  status?: string;
  id: string;
};
type Book = {
  id: string;
  thumbnail: string;
  title: string;
  authors: string[];
  average_rating: number;
  ISBN10: string;
  favorited: boolean;
  status: string;
  userbookID: string;
};
type UserBooksResponse = {
  status: string;
  data: { books: Book[] };
};
type EditUserBookResponse = {
  status: string;
  data: { book: Book };
};

const initialState = {
  books: [] as Book[],
  isLoading: false,
  error: '',
};

export const getBooks = createAsyncThunk(
  'userBooks/get',
  async (params, thunkAPI): Promise<UserBooksResponse | unknown> => {
    try {
      const response = await axios.get('api/users/books', {
        withCredentials: true,
      });
      return response.data;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue('To Do');
    }
  },
);
export const addBook = createAsyncThunk(
  'userBooks/add',
  async (
    params: EditUserBookParams,
    thunkAPI,
  ): Promise<EditUserBookResponse | unknown> => {
    try {
      const changes: EditUserBookParams & { googleID: string } =
        {} as EditUserBookParams & { googleID: string };
      if (params.favorited !== null) changes.favorited = params.favorited;
      else changes.favorited = false;

      if (params.status) changes.status = params.status;
      else changes.status = 'planned';

      changes.googleID = params.id;

      const response = await axios.post(`api/users/books`, changes, {
        withCredentials: true,
      });

      thunkAPI.dispatch(changeBook(response.data.data.book));
      return response.data;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue('To Do');
    }
  },
);

export const editBook = createAsyncThunk(
  'userBooks/edit',
  async (
    params: EditUserBookParams,
    thunkAPI,
  ): Promise<EditUserBookResponse | unknown> => {
    try {
      const changes: EditUserBookParams = {} as EditUserBookParams;
      if (params.favorited !== null) changes.favorited = params.favorited;
      if (params.status) changes.status = params.status;
      const response = await axios.put(
        `api/users/books/${params.id}`,
        changes,
        {
          withCredentials: true,
        },
      );
      thunkAPI.dispatch(changeBook(response.data.data.book));
      return response.data;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue('To Do');
    }
  },
);

export const UserBookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    clear: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.books = (action.payload as UserBooksResponse).data.books;
        state.isLoading = false;
        state.error = '';
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.books = [] as Book[];
        state.isLoading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(editBook.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(editBook.fulfilled, (state, action) => {
        state.books = state.books.map((book) => {
          if (
            book.userbookID ===
            (action.payload as EditUserBookResponse).data.book.userbookID
          )
            return (action.payload as EditUserBookResponse).data.book;
          return book;
        });
        state.isLoading = false;
        state.error = '';
      })
      .addCase(editBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(addBook.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.books.push((action.payload as EditUserBookResponse).data.book);
        state.isLoading = false;
        state.error = '';
      })
      .addCase(addBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clear } = UserBookSlice.actions;
export default UserBookSlice.reducer;

const items = (state: RootState) => state.userBooks.books;
export const favorites = createSelector([items], (books) =>
  books.filter((book) => book.favorited),
);
export const planned = createSelector([items], (books) =>
  books.filter((book) => book.status === 'planned'),
);
export const reading = createSelector([items], (books) =>
  books.filter((book) => book.status === 'reading'),
);
