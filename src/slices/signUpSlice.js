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
    extraReducers: {
        [createNewUser.pending.type]: (state) => {
            state.loading = true
        },
        [createNewUser.fulfilled.type]: (state, action) => {
            state.loading = false
            state.newUser = action.payload
            state.success = true
        },
        [createNewUser.rejected.type]: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
})

export default signUpSlice.reducer