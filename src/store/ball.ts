import {Ball, Field, Robot} from "./ssl";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface Robots {
    allies: Robot[],
    opponents: Robot[]
}

const initialState = {
    ball : {
        x: 0,
        y: 0
    } as Ball
}

// TODO : Add some types
const ballSlice = createSlice({
    name: 'robots',
    initialState,
    reducers: {
        updateBall(state, action: PayloadAction<Ball>) {
            state.ball = action.payload;
        }
    }
})

export const { updateBall } = ballSlice.actions;

export default ballSlice.reducer;