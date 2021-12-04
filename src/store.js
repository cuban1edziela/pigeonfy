import {configureStore} from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import sessionReducer from "./slices/sessionSlice"
import signUpSliceReducer from "./slices/signUpSlice";
import contactSliceReducer from './slices/contactSlice';

const loggerMiddleware = createLogger();

export const store = configureStore({
    reducer: {
        session: sessionReducer,
        signUp: signUpSliceReducer,
        contact: contactSliceReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }).concat(loggerMiddleware, thunkMiddleware),
})

export const dispatch = store.dispatch