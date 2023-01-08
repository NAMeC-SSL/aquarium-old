import {Field} from "./ssl";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    field : {
        length : 9.0,
        width: 6.0,
        center_radius: 1.0,
        goal_width: 1.0,
        goal_depth: 0.3,
        penalty_width: 2.0,
        penalty_depth: 1.0
    } as Field
}

// TODO : Add some types
const fieldSlice = createSlice({
    name: 'field',
    initialState,
    reducers: {
        updateField(state, action: PayloadAction<Field>) {
            // TODO: Maybe look if it's equal ?
            state.field = action.payload;
        }
    }
})

export const { updateField } = fieldSlice.actions;

export default fieldSlice.reducer;