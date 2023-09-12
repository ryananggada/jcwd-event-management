import { configureStore } from '@reduxjs/toolkit';
import authLoginSlices from './slices/authLogin';

const store = configureStore({
  reducer: {
    auth: authLoginSlices,
  },
});

export default store;
