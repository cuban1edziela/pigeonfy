import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    loading: true,
    isAuthenticated: false,
    error: undefined,
    user: undefined,
}

export const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        load: (state) => {
            state.loading = true
        },
        init: (state) => {
            state.loading = false
        },
        loginSuccess: (state, action) => {
            state.isAuthenticated = true
            state.user = action.payload
        },
        loginFailure: (state, action) => {
            state.error = action.payload
            state.loading = true
        },
        loginFinish: (state) => {
            state.loading = false
        },
        refreshAuthInit: (state) => {
            state.loading = true
        },
        refreshAuthSuccess: (state, action) => {
            state.isAuthenticated = true
            state.user = action.payload
        },
        refreshAuthFailure: (state) => {
            state.isAuthenticated =false
            state.user = undefined;
        },
        refreshAuthFinish: (state) => {
            state.loading = false
        },
        logout: (state) => {
            state.isAuthenticated = false
            state.user = undefined;
        }
    }
})

export const {
    load,
    init,
    loginSuccess,
    loginFailure,
    loginFinish,
    refreshAuthInit,
    refreshAuthSuccess,
    refreshAuthFinish,
    refreshAuthFailure,
    logout,
} = sessionSlice.actions;

export default sessionSlice.reducer;
