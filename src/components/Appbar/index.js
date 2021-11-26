import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Logo from './logo.svg'
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';

export default function ButtonAppBar() {

    const history = useHistory();
    const session = useSelector(state => state.session)

    const goToEnciphering = () => {session.isAuthenticated ? history.push('/encipher') : history.push('/login')};
    const goToDeciphering = () => {session.isAuthenticated ?  history.push('/decipher') : history.push('/login')};
    const goToContactBook = () => {session.isAuthenticated ?  history.push('/contact-book') : history.push('/login')};
    const goToPricing = () => {session.isAuthenticated ?  history.push('/pricing') : history.push('/login')}
    const goToAboutUs = () => {session.isAuthenticated ?  history.push('/about-us') : history.push('/login')}
    const goToLogin = () => history.push('/login')

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Link to='/'> <img width='50px' src={Logo} alt="Pigeonfy Logo" /> </Link>
                    <Typography variant="h5" component="div" sx={{ ml: 2 }}>
                        PIGEON<span style={{ color: '#d49d40' }}>FY</span>
                    </Typography>

                    <Typography sx={{ position: 'right', p: '30px', flexDirection: 'row', display: 'block', ml: 'auto' }}>
                        <Button sx={{ ml: 5 }} variant='text' onClick={goToEnciphering}
                            color="secondary">ENCIPHER</Button>

                        <Button sx={{ ml: 5 }} variant='text' onClick={goToDeciphering}
                            color="secondary">DECIPHER</Button>

                        <Button sx={{ ml: 5 }} variant='text' onClick={goToContactBook} color="secondary">CONTACT
                            BOOK</Button>

                        <Button sx={{ ml: 5 }} variant='text' onClick={goToPricing} color="secondary">PRICING</Button>

                        <Button sx={{ ml: 5 }} variant='text' onClick={goToAboutUs} color="secondary">ABOUT US</Button>


                        {session.isAuthenticated ? '' : <Button sx={{ ml: 5 }} variant='outlined' onClick={goToLogin} color="secondary">LOGIN</Button>}

                    </Typography>

                    {session.isAuthenticated ?  <Link to='/profile'>
                        <Avatar alt={session.user.displayName} src="/static/images/avatar/3.jpg" />
                    </Link> : ''}

                </Toolbar>
            </AppBar>
        </Box>
    );
}
