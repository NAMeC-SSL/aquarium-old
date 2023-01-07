import {Field} from "./ssl";
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    field : {
        length : 9.0,
        width: 6.0,
        center_radius: 1.0,
        goal: {
            width: 1.0,
            depth: 0.3
        },
        penalty : {
            width: 2.0,
            depth: 1.0
        }
    } as Field
}

// TODO : Add some types
const fieldSlice = createSlice({
    name: 'field',
    initialState,
    reducers: {
    }
})

// export const {update_field } = counterSlice.actions;

export default fieldSlice.reducer;