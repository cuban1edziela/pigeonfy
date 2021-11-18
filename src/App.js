import Appbar from './components/Appbar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Home from './containers/Home';
import CssBaseline from '@mui/material/CssBaseline';
import Enciphering from './containers/Enciphering';
import Deciphering from './containers/Deciphering';
import SignUp from './containers/SignUp';
import Login from './containers/Login';
import Pricing from './containers/Pricing';
import ContactBook from './containers/ContactBook';
import { Footer } from './components/Footer';
import { AppBox } from './components/AppBox';




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
    }}
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Appbar />
        <Switch>
          <Route exact path='/'>
            <AppBox>
              <Home />
            </AppBox>
          </Route>

          <Route path='/encipher'>
            <AppBox>
              <Enciphering />
            </AppBox>
          </Route>

          <Route path='/decipher'>
            <AppBox>
              <Deciphering />
            </AppBox>
          </Route>

          <Route path='/contact-book'>
            <AppBox>
              <ContactBook />
            </AppBox>
          </Route>

          <Route path='/pricing'>
            <AppBox>
              <Pricing />
            </AppBox>
          </Route>

          <Route path='/about-us'>
            <AppBox>
              <h1>About us Page</h1>
            </AppBox>
          </Route>

          <Route path='/login'>
            <AppBox>
              <Login />
            </AppBox>
          </Route>

          <Route path='/sign-up'>
            <AppBox>
              <SignUp />
            </AppBox>
          </Route>
        </Switch>
        <AppBox>
        <Footer/>
        </AppBox>
      </Router>
    </ThemeProvider>
  );
}

export default App;
