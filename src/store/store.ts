import { configureStore } from "@reduxjs/toolkit";
import  fieldReducer from './field';

export const store = configureStore({
    reducer:  {
        field: fieldReducer,
    }
})