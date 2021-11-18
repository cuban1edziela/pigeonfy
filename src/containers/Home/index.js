import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import PigeonImage from './pigeonimage.svg'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {useHistory} from "react-router-dom";
import {useTheme} from '@mui/material/styles'

export default function SimpleContainer() {
    const history = useHistory();
    const theme = useTheme()

    const goToSignUp = () => {
        history.push("/sign-up")
    }

    return (
        <>
            <Container maxWidth="sm " sx={{bgcolor: 'primary'}}>
                <Box sx={{pt: 2, display: 'flex', flexDirection: 'row'}}>

                    <Box sx={{width: '600px', display: 'flex', m: 'auto'}}>
                        <Stack spacing={5}>

                            <Typography variant="h3" component="div" color='textPrimary'>
                                YOUR <span style={{color: theme.palette.secondary.main}}> PRIVACY  </span> IS OUR
                                TOP <span style={{color: theme.palette.secondary.main}}> PRIORITY </span>
                            </Typography>


                            <Box sx={{
                                textAlign: 'center',
                                alignSelf: 'center',
                                width: '200px',
                                height: '50px',
                                display: 'flex',
                                m: 'auto'
                            }}>

                                <Button
                                    onClick={goToSignUp}
                                    sx={{color: 'textPrimary'}}
                                    variant='contained' size='large'
                                    color="secondary"
                                >
                                    GET STARTED
                                </Button>

                            </Box>

                        </Stack>
                    </Box>

                    <Box sx={{width: '400px', display: 'block', pl: 'auto'}}>
                        <img src={PigeonImage} alt='PigeonImage'/>
                    </Box>

                </Box>
            </Container>
        </>
    );
}
