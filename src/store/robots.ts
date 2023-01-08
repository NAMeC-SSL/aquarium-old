import {Field, Robot} from "./ssl";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface Robots {
    allies: Robot[],
    opponents: Robot[]
}

const initialState = {
    allies: [],
    opponents: []
} as Robots

// TODO : Add some types
const robotSlice = createSlice({
    name: 'robots',
    initialState,
    reducers: {
        updateRobots(state, action: PayloadAction<Robots>) {
            return {
                allies: action.payload.allies,
                opponents: action.payload.opponents
            }
        }
    }
})

export const { updateRobots } = robotSlice.actions;

export default robotSlice.reducer;