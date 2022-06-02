import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createHistory, getHistoriesOnTour } from 'services/historyService';

export const fetchHistoriesOnTour = createAsyncThunk(
  'history/getHistoriesOnTour',
  async (tourId, { rejectWithValue }) => {
    try {
      const { data } = await getHistoriesOnTour(tourId);
      return data.histories;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createView = createAsyncThunk(
  'history/createHistory',
  async (tour, { rejectWithValue }) => {
    try {
      const { data } = await createHistory(tour);
      return data.history;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  views: [],
  loading: false,
  error: '',
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  extraReducers: {
    [fetchHistoriesOnTour.pending]: (state) => {
      state.loading = true;
    },
    [fetchHistoriesOnTour.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.views = payload;
    },
    [fetchHistoriesOnTour.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.message;
    },
    [createView.pending]: (state) => {
      state.loading = true;
    },
    [createView.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.views.push(payload);
    },
    [createView.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.message;
    },
  },
});

export default historySlice.reducer;
