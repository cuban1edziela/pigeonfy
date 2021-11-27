import {createSlice} from "@reduxjs/toolkit";
import {createNewUser} from "../services/signUp";

const initialState = {
    loading: false,
    newUser: undefined,
    success: false,
    error: undefined,
}

export const signUpSlice = createSlice({
    name: "signUp",
    initialState,
    reducers: {},
    extraReducers: {
        [createNewUser.pending.type]: (state) => {
            state.loading = true
        },
        [createNewUser.fulfilled.type]: (state, action) => {
            state.success = true
            state.loading = false
            state.newUser = action.payload
        },
        [createNewUser.rejected.type]: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
})

export default signUpSlice.reducer