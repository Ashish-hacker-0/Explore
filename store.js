import { configureStore } from "@reduxjs/toolkit";
import userReducer from './Slices';

export const store = configureStore({
    reducer:userReducer
});