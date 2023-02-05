/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export interface LoginData {
  email: string;
  password: string;
}
export interface RegisterData {
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
}

interface UserState {
  user: User;
  isLoading: boolean;
  error: string;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  user: {} as User,
  isLoading: false,
  error: '',
  isLoggedIn: Boolean(localStorage.getItem('isLoggedIn')),
};

export const login = createAsyncThunk(
  'user/login',
  async (user: LoginData, thunkAPI): Promise<{ success: string } | unknown> => {
    try {
      const response = await axios.post('/api/users/login', user, {
        withCredentials: true,
      });
      localStorage.setItem('isLoggedIn', 'true');
      const userData = await axios.get('/api/users/me', {
        withCredentials: true,
      });
      return userData.data.data.user;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message =
          error?.response?.data?.message || error?.message || error?.toString();
        return thunkAPI.rejectWithValue(message as string);
      }
      return thunkAPI.rejectWithValue('Something very wrong');
    }
  },
);

export const register = createAsyncThunk(
  'user/register',
  async (
    user: RegisterData,
    thunkAPI,
  ): Promise<{ success: string } | unknown> => {
    try {
      const response = await axios.post('/api/users/signup', user, {
        withCredentials: true,
      });
      localStorage.setItem('isLoggedIn', 'true');
      const userData = await axios.get('/api/users/me', {
        withCredentials: true,
      });
      return userData.data.data.user;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message =
          error?.response?.data?.message || error?.message || error?.toString();
        return thunkAPI.rejectWithValue(message as string);
      }
      return thunkAPI.rejectWithValue('Something very wrong');
    }
  },
);

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state) => {
      localStorage.removeItem('isLoggedIn');
      state.isLoading = false;
      state.error = '';
      state.user = {} as User;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    //
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = '';
        state.user = {} as User;
        state.isLoggedIn = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.error = '';
        state.user = action.payload as User;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.error = action.payload as string;
        state.user = {} as User;
      });
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = '';
        state.user = {} as User;
        state.isLoggedIn = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.error = '';
        state.user = action.payload as User;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.error = action.payload as string;
        state.user = {} as User;
      });
  },
});

export default UserSlice.reducer;
export const { reset } = UserSlice.actions;
