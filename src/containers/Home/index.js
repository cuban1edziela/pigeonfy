import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import PigeonImage from './pigeonimage.svg'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useHistory } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { UnderLoad } from '../loading';

export default function SimpleContainer() {
    const history = useHistory();
    const theme = useTheme()
    const session = useSelector(state => state.session)

    if(session.loading) {
        return UnderLoad()
    }

    const goToSignUp = () => {
        history.push('/sign-up')
    }
    const goToEncipher = () => {
        history.push('/encipher')
    }

    return (
        <>
            <Container maxWidth="sm " sx={{ bgcolor: 'primary' }}>
                <Box sx={{ pt: 2, display: 'flex', flexDirection: 'row' }}>

                    <Box sx={{ width: '50%', display: 'flex', m: 'auto' }}>
                        <Stack spacing={5}>

                            {session.isAuthenticated ? <Typography variant="h3" component="div" color='textPrimary'>
                                Thank You <span style={{ color: theme.palette.secondary.main }}> {session.user?.displayName}  </span> for
                                being with <span style={{ color: theme.palette.secondary.main }}> us </span>
                            </Typography> :
                                <Typography variant="h3" component="div" color='textPrimary'>
                                    YOUR <span style={{ color: theme.palette.secondary.main }}> PRIVACY  </span> IS OUR
                                    TOP <span style={{ color: theme.palette.secondary.main }}> PRIORITY </span>
                                </Typography>}


                            <Box sx={{
                                textAlign: 'center',
                                alignSelf: 'center',
                                width: '200px',
                                height: '50px',
                                display: 'flex',
                                m: 'auto'
                            }}>

                                {session.isAuthenticated ?
                                    <Button
                                        onClick={goToEncipher}
                                        sx={{ color: 'textPrimary' }}
                                        variant='contained' size='large'
                                        color="secondary"
                                    >
                                        ENCIPHER NOW
                                    </Button> :

                                    <Button
                                        onClick={goToSignUp}
                                        sx={{ color: 'textPrimary' }}
                                        variant='contained' size='large'
                                        color="secondary"
                                    >
                                        GET STARTED
                                    </Button>}

                            </Box>

                        </Stack>
                    </Box>

                    <Box sx={{ width: '400px', display: 'block', p: 'auto' }}>
                        <img src={PigeonImage} alt='PigeonImage' />
                    </Box>

                </Box>
            </Container>
        </>
    );
}
