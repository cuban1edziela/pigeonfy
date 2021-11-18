import Appbar from './components/Appbar'
import * as React from 'react';
import {Footer} from './components/Footer';
import {AppBox} from './components/AppBox';
import {Routes} from "./Routes";

function App() {
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
