import {Route, Switch} from "react-router-dom";
import {AppBox} from "./components/AppBox";
import Home from "./containers/Home";
import Enciphering from "./containers/Enciphering";
import Deciphering from "./containers/Deciphering";
import ContactBook from "./containers/ContactBook";
import Pricing from "./containers/Pricing";
import Login from "./containers/Login";
import SignUp from "./containers/SignUp";
import PageNotFound from "./containers/PageNotFound";
import UsersProfile from './containers/UsersProfile'
import * as React from "react";

export const Routes = () => {
    return (
        <AppBox>
            <Switch>
                <Route exact path='/'>
                    <Home/>
                </Route>

                <Route path='/encipher'>
                    <Enciphering/>
                </Route>

                <Route path='/decipher'>
                    <Deciphering/>
                </Route>

                <Route path='/contact-book'>
                    <ContactBook/>
                </Route>

                <Route path='/pricing'>
                    <Pricing/>
                </Route>

                <Route path='/about-us'>
                    <h1>About us Page</h1>
                </Route>

                <Route path='/login'>
                    <Login/>
                </Route>

                <Route path='/sign-up'>
                    <SignUp/>
                </Route>

                <Route path='/profile'>
                    <UsersProfile />
                </Route>

                <Route path='/*'>
                    <PageNotFound />
                </Route>

            </Switch>
        </AppBox>
    )
}