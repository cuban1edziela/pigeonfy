import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {store} from './store';


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
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Router>
                    <App />
                    <ToastContainer />
                </Router>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,

    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
