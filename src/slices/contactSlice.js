import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    contact: '',
    userContacts: [],
    contactObjects: undefined
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
        },
        setContactObjects: (state, action) => {
            state.contactObjects = action.payload
        }
    }
});

export const {
    setContact,
    setUserContacts,
    setContactObjects
} = contactSlice.actions;
export default contactSlice.reducer;