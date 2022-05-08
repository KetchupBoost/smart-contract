import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import walletReducer from './slices/walletSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        wallet: walletReducer,
    }
});