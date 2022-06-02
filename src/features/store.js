import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth/authSlice';
import tourReducer from './tour/tourSlice';
import historyReducer from './history/historySlice';
import bookmarkSlice from './bookmark/bookmarkSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    tour: tourReducer,
    history: historyReducer,
    bookmark: bookmarkSlice,
  },
});

export default store;
