/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../store';

type SearchBooksParams = {
  searchValue: string;
  additional?: boolean;
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
type SearchBooksResponse = {
  status: string;
  totalItems: number;
  data: Book[];
};

const initialState = {
  books: [] as Book[],
  totalItems: 0,
  isLoading: false,
  error: '',
};
export const searchBooks = createAsyncThunk(
  'books/search',
  async (
    params: SearchBooksParams,
    thunkAPI,
  ): Promise<SearchBooksResponse | unknown> => {
    try {
      const url = new URL('api/books', 'http://localhost:3000');
      if (params.additional) {
        const state = thunkAPI.getState() as RootState;
        url.searchParams.append(
          'page',
          (state.books.books.length / 10).toString(),
        );
      }
      url.searchParams.append('search', params.searchValue);
      const response = await axios.get(url.toString(), {
        withCredentials: true,
      });
      return response.data;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue('To Do');
    }
  },
);

export const BookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    clear: () => initialState,
    changeBook: (state, action: PayloadAction<Book>) => {
      state.books = state.books.map((book) => {
        if (book.id === action.payload.id) return action.payload;
        return book;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchBooks.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(searchBooks.fulfilled, (state, action) => {
        state.books = state.books.concat(
          (action.payload as SearchBooksResponse).data,
        );
        state.totalItems = (action.payload as SearchBooksResponse).totalItems;
        state.isLoading = false;
        state.error = '';
      })
      .addCase(searchBooks.rejected, (state, action) => {
        state.books = [] as Book[];
        state.totalItems = 0;
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clear, changeBook } = BookSlice.actions;
export default BookSlice.reducer;
