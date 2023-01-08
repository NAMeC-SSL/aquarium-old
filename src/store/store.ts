import {combineReducers, configureStore} from "@reduxjs/toolkit";
import  fieldReducer from './field';
import robotsReducer from './robots';
import ballReducer from './ball';


export const store = configureStore({
    reducer:  {
        field: fieldReducer,
        robots: robotsReducer,
        ball: ballReducer,
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
