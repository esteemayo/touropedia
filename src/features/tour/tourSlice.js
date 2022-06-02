import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as tourAPI from 'services/tourService';

export const fetchTours = createAsyncThunk(
  'tour/getTours',
  async (page, { rejectWithValue }) => {
    try {
      const { data } = await tourAPI.getTours(page);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchToursByUser = createAsyncThunk(
  'tour/getToursByUser',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await tourAPI.getToursByUser();
      return data.tours;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const searchTours = createAsyncThunk(
  'tour/searchTours',
  async (searchQuery, { rejectWithValue }) => {
    try {
      const { data } = await tourAPI.getToursBySearch(searchQuery);
      return data.tours;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchToursByTag = createAsyncThunk(
  'tour/getToursByTag',
  async (tag, { rejectWithValue }) => {
    try {
      const { data } = await tourAPI.getTagTours(tag);
      return data.tours;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchRelatedTours = createAsyncThunk(
  'tour/getRelatedTours',
  async (tags, { rejectWithValue }) => {
    try {
      const { data } = await tourAPI.getRelatedTours(tags);
      return data.tours;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchTour = createAsyncThunk(
  'tour/getTour',
  async (tourId, { rejectWithValue }) => {
    try {
      const { data } = await tourAPI.getTourById(tourId);
      return data.tour;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createNewTour = createAsyncThunk(
  'tour/createTour',
  async ({ tourData, navigate, toast }, { rejectWithValue }) => {
    try {
      const { data } = await tourAPI.createTour({ ...tourData });
      toast.success('Tour Added Successfully');
      navigate('/');
      return data.tour;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updTour = createAsyncThunk(
  'tour/updateTour',
  async ({ id, tourData, navigate, toast }, { rejectWithValue }) => {
    try {
      const { data } = await tourAPI.updateTour(id, { ...tourData });
      toast.success('Tour Updated Successfully');
      navigate('/');
      return data.tour;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const likeTour = createAsyncThunk(
  'tour/likeTour',
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data } = await tourAPI.likeTour(id);
      return data.tour;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const removeTour = createAsyncThunk(
  'tour/deleteTour',
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      await tourAPI.deleteTour(id);
      toast.success('Tour Deleted Successfully');
      return;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  tour: {},
  tours: [],
  userTours: [],
  tagTours: [],
  relatedTours: [],
  currentPage: 1,
  numberOfPages: null,
  error: '',
  loading: false,
};

const tourSlice = createSlice({
  name: 'tour',
  initialState,
  reducers: {
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
  },
  extraReducers: {
    [fetchTours.pending]: (state) => {
      state.loading = true;
    },
    [fetchTours.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.tours = payload.tours;
      state.numberOfPages = payload.numberOfPages;
      state.currentPage = payload.currentPage;
    },
    [fetchTours.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.message;
    },
    [fetchToursByUser.pending]: (state) => {
      state.loading = true;
    },
    [fetchToursByUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userTours = payload;
    },
    [fetchToursByUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.message;
    },
    [searchTours.pending]: (state) => {
      state.loading = true;
    },
    [searchTours.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.tours = payload;
    },
    [searchTours.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.message;
    },
    [fetchToursByTag.pending]: (state) => {
      state.loading = true;
    },
    [fetchToursByTag.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.tagTours = payload;
    },
    [fetchToursByTag.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.message;
    },
    [fetchRelatedTours.pending]: (state) => {
      state.loading = true;
    },
    [fetchRelatedTours.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.relatedTours = payload;
    },
    [fetchRelatedTours.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.message;
    },
    [fetchTour.pending]: (state) => {
      state.loading = true;
    },
    [fetchTour.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.tour = payload;
    },
    [fetchTour.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.message;
    },
    [createNewTour.pending]: (state) => {
      state.loading = true;
    },
    [createNewTour.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.tours.unshift(payload);
    },
    [createNewTour.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.message;
    },
    [updTour.pending]: (state) => {
      state.loading = true;
    },
    [updTour.fulfilled]: (state, { meta, payload }) => {
      state.loading = false;

      const {
        arg: { id },
      } = meta;

      if (id) {
        state.tours.map((item) => (item._id === id ? payload : item));
        state.userTours.map((item) => (item._id === id ? payload : item));
      }
    },
    [updTour.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.message;
    },
    [likeTour.pending]: (state) => {},
    [likeTour.fulfilled]: (state, { meta, payload }) => {
      state.loading = false;

      const {
        arg: { id },
      } = meta;

      if (id) {
        state.tours.map((item) => (item._id === id ? payload : item));
      }
    },
    [likeTour.rejected]: (state, { payload }) => {
      state.error = payload.message;
    },
    [removeTour.pending]: (state) => {
      state.loading = true;
    },
    [removeTour.fulfilled]: (state, { meta }) => {
      state.loading = false;
      // console.log(meta);
      const {
        arg: { id },
      } = meta;

      if (id) {
        state.tours.splice(
          state.tours.findIndex((item) => item._id === id),
          1
        );
        state.userTours.splice(
          state.userTours.findIndex((item) => item._id === id),
          1
        );
      }
    },
    [removeTour.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.message;
    },
  },
});

export const { setCurrentPage } = tourSlice.actions;

export default tourSlice.reducer;
