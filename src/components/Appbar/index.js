import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Logo from './logo.svg'
import {Link} from "react-router-dom";
import {useHistory} from "react-router-dom";
import { useSelector} from 'react-redux';



export default function ButtonAppBar() {
    
    const history = useHistory();
    const isLogged = useSelector(state => state.isLogged);

    const goToEnciphering = () => history.push('/encipher')
    const goToDeciphering = () => history.push('/decipher')
    const goToContactBook = () => history.push('/contact-book')
    const goToPricing = () => history.push('/pricing')
    const goToAboutUs = () => history.push('/about-us')
    const goToLogin = () => history.push('/login')

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Link to='/'> <img width='50px' src={Logo} alt="Pigeonfy Logo"/> </Link>
                    <Typography variant="h5" component="div" sx={{ml: 2}}>
                        PIGEON<span style={{color: '#d49d40'}}>FY</span>
                    </Typography>

                    <Typography sx={{position: 'right', p: '30px', flexDirection: 'row', display: 'block', ml: 'auto'}}>
                        <Button sx={{ml: 5}} variant='text' onClick={goToEnciphering}
                                color="secondary">ENCIPHER</Button>

                        <Button sx={{ml: 5}} variant='text' onClick={goToDeciphering}
                                color="secondary">DECIPHER</Button>

                        <Button sx={{ml: 5}} variant='text' onClick={goToContactBook} color="secondary">CONTACT
                            BOOK</Button>

                        <Button sx={{ml: 5}} variant='text' onClick={goToPricing} color="secondary">PRICING</Button>

                        <Button sx={{ml: 5}} variant='text' onClick={goToAboutUs} color="secondary">ABOUT US</Button>

                        { isLogged ? '' : <Button sx={{ml: 5}} variant='outlined' onClick={goToLogin} color="secondary">LOGIN</Button>}
                    </Typography>

                </Toolbar>
            </AppBar>
        </Box>
    );
}
