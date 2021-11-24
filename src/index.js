import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router } from 'react-router-dom'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import allReducers from './reducers'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDaYStMTdnjjpEbBJpT9GMdaat8DVm6Kc4",
  authDomain: "pigeonfy-1989.firebaseapp.com",
  projectId: "pigeonfy-1989",
  storageBucket: "pigeonfy-1989.appspot.com",
  messagingSenderId: "569786070051",
  appId: "1:569786070051:web:bfbdb3d00a8c85c6ad6d96"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const theme = createTheme({
    palette: {
        primary: {
            main: '#252220'
        },
        secondary: {
            main: '#d49d40'
        },
        text: {
            primary: '#fff',
            secondary: '#d49d40'
        }
    },

    tableCell: {
        "$hover:hover &": {
            color: "#252220"
        }
    }
})

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Router>
                    <App />
                </Router>
            </ThemeProvider>

        </React.StrictMode>
    </Provider>,

    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
