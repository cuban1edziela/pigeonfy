import Appbar from './components/Appbar'
import React, {useEffect} from 'react';
import {Footer} from './components/Footer';
import {AppBox} from './components/AppBox';
import {Routes} from "./Routes";
import { useDispatch } from 'react-redux';
import {refreshAuth} from "./services/session";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "./firebase";


function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
                dispatch(refreshAuth(authUser))
            }
        );
        return () => {
            unsubscribe();
        }

    }, [dispatch])

    return (
        <>
            <Appbar/>
            <Routes/>
            <AppBox>
                <Footer/>
            </AppBox>
        </>

    );
}

export default App;
