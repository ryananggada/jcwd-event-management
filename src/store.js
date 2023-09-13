import { configureStore } from '@reduxjs/toolkit';
import authLoginSlices from './slices/authLogin';
import { default as transactionSliceReducer } from './slices/transaction'

const store = configureStore({
  reducer: {
    auth: authLoginSlices,
    buy: transactionSliceReducer
  },
});

export default store;
