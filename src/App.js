import Appbar from './components/Appbar'
import React, { useEffect } from 'react';
import { Footer } from './components/Footer';
import { AppBox } from './components/AppBox';
import { Routes } from "./Routes";
import { useDispatch, useSelector} from 'react-redux';
import { refreshAuth } from "./services/session";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { UnderLoad} from './containers/loading';
import { setContact } from './slices/contactSlice';


function App() {

    const session = useSelector(state => state.session)
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            dispatch(refreshAuth(authUser))
            dispatch(setContact([]))
        }
        );
        return () => {
            unsubscribe();
        }

    }, [dispatch])

    return (
        <>
            <Appbar />
                {session.loading ? <UnderLoad /> : <Routes />}
            <AppBox>
                <Footer />
            </AppBox>
        </>

    );
}

export default App;
