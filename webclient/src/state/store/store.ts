/* eslint-disable import/no-cycle */

import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { UserSlice } from './features/userSlice';
import { BookSlice } from './features/booksSlice';
import { UserBookSlice } from './features/userBookSlice';

export const store = configureStore({
  reducer: {
    user: UserSlice.reducer,
    books: BookSlice.reducer,
    userBooks: UserBookSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
