import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as bookmarkAPI from 'services/bookmarkService';

export const fetchOneBookmark = createAsyncThunk(
  'bookmark/getOneBookmark',
  async (tourId, { rejectWithValue }) => {
    try {
      const { data } = await bookmarkAPI.getOneBookmark(tourId);
      return data.bookmark;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createNewBookmark = createAsyncThunk(
  'bookmark/createBookmark',
  async ({ tour, toast }, { rejectWithValue }) => {
    try {
      const { data } = await bookmarkAPI.createBookmark({ tour });
      toast.success('Tour Bookmarked');
      return data.bookmark;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const removeBookmark = createAsyncThunk(
  'bookmark/deleteBookmark',
  async ({ bookmarkId, toast }, { rejectWithValue }) => {
    try {
      await bookmarkAPI.deleteBookmark(bookmarkId);
      toast.success('Bookmark Removed');
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  bookmark: null,
  loading: false,
  error: '',
};

const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState,
  extraReducers: {
    [fetchOneBookmark.pending]: (state) => {
      state.loading = true;
    },
    [fetchOneBookmark.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.bookmark = payload;
    },
    [fetchOneBookmark.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.message;
    },
    [createNewBookmark.pending]: (state) => {
      state.loading = true;
    },
    [createNewBookmark.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.bookmark = payload;
    },
    [createNewBookmark.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.message;
    },
    [removeBookmark.pending]: (state) => {
      state.loading = true;
    },
    [removeBookmark.fulfilled]: (state) => {
      state.loading = false;
      state.bookmark = null;
    },
    [removeBookmark.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.message;
    },
  },
});

export default bookmarkSlice.reducer;
