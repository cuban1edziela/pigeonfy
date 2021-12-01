import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    contact: undefined,
    loading: false,
}

export const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        setContact: (state, action) => {
            state.contact = action.payload
        }
    }
});

export const {
    setContact
} = contactSlice.actions;
export default contactSlice.reducer;