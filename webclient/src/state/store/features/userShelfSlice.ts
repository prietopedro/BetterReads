/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
// eslint-disable-next-line import/no-cycle

export type Shelf = {
  id: string;
  name: string;
  books: string[];
};
type UserShelfResponse = {
  status: string;
  data: { shelf: Shelf };
};
type UserShelvesResponse = {
  status: string;
  data: { shelves: Shelf[] };
};
type EditShelfParams = {
  books?: string[];
  name?: string;
  id: string;
};

const initialState = {
  shelves: [] as Shelf[],
  isLoading: false,
  error: '',
};

export const getShelves = createAsyncThunk(
  'userShelf/get',
  async (params, thunkAPI): Promise<UserShelvesResponse | unknown> => {
    try {
      const response = await axios.get('/api/users/shelves', {
        withCredentials: true,
      });
      return response.data;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue('To Do');
    }
  },
);
export const editShelf = createAsyncThunk(
  'userShelf/edit',
  async (
    params: EditShelfParams,
    thunkAPI,
  ): Promise<UserShelfResponse | unknown> => {
    try {
      const response = await axios.put(
        `/api/users/shelves/${params.id}`,
        params,
        {
          withCredentials: true,
        },
      );
      return response.data;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue('To Do');
    }
  },
);
export const addShelf = createAsyncThunk(
  'userShelf/add',
  async (params: string, thunkAPI): Promise<UserShelfResponse | unknown> => {
    try {
      const response = await axios.post(
        `/api/users/shelves`,
        { name: params },
        {
          withCredentials: true,
        },
      );
      return response.data;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue('To Do');
    }
  },
);
export const deleteShelf = createAsyncThunk(
  'userShelf/delete',
  async (params: string, thunkAPI): Promise<UserShelfResponse | unknown> => {
    try {
      const response = await axios.delete(`/api/users/shelves/${params}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue('To Do');
    }
  },
);

export const UserShelfSlice = createSlice({
  name: 'userShelf',
  initialState,
  reducers: {
    clear: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getShelves.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(getShelves.fulfilled, (state, action) => {
        state.shelves = (action.payload as UserShelvesResponse).data.shelves;
        state.isLoading = false;
        state.error = '';
      })
      .addCase(getShelves.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(editShelf.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(editShelf.fulfilled, (state, action) => {
        state.shelves = state.shelves.map((shelf) => {
          if (shelf.id === (action.payload as UserShelfResponse).data.shelf.id)
            return (action.payload as UserShelfResponse).data.shelf;
          return shelf;
        });
        state.isLoading = false;
        state.error = '';
      })
      .addCase(editShelf.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(addShelf.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(addShelf.fulfilled, (state, action) => {
        const payload = action.payload as UserShelfResponse;
        state.shelves.push(payload.data.shelf);
        state.isLoading = false;
        state.error = '';
      })
      .addCase(addShelf.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(deleteShelf.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(deleteShelf.fulfilled, (state, action) => {
        const payload = action.payload as UserShelfResponse;
        state.shelves = state.shelves.filter(
          (shelf) => shelf.id !== payload.data.shelf.id,
        );
        state.isLoading = false;
        state.error = '';
      })
      .addCase(deleteShelf.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clear } = UserShelfSlice.actions;
export default UserShelfSlice.reducer;
