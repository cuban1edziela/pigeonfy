import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    contact: '',
    userContacts: []
}

export const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: { 
        setContact: (state, action) => {
            state.contact = action.payload
        },
        setUserContacts: (state, action) => {
            state.userContacts = action.payload
        }
    }
});

export const {
    setContact,
    setUserContacts
} = contactSlice.actions;
export default contactSlice.reducer;