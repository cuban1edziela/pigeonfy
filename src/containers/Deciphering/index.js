import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { useTheme } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from 'react'
import axios from 'axios';
import PigeonKey from './PigeonKey.svg'

export default function SimpleContainer() {
    const theme = useTheme()
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false);
    const [cipheredMessage, setCipheredMessage] = useState('')

    const handleClick = () => {
        setLoading(true);
        console.log(message)

        axios({
            method: 'post',
            url: 'http://127.0.0.1:5000/message/decipher',
            data: {
                message: message
            }
        }).then(res => {
            console.log(res.data);
            setCipheredMessage(res.data.response)
            console.log(cipheredMessage)
            setLoading(false)
        })
    };


    const handleChange = (event) => {
        setMessage(event.target.value);
    }


    return (

        <div style={{ width: '100%' }}>


            <Box sx={{ display: 'flex', pl: 5 }}>
                <Typography variant="h5" component="div" color='textPrimary'>
                    DECIPHER A <span style={{ color: '#d49d40' }}> MESSAGE </span>
                </Typography>
            </Box>

            <Box sx={{ display: 'inline-flex', width:'100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', pl: 5}}>

                <Box sx={{ display: 'inline-flex', width: '100%', pt:5 }}>
                    <TextareaAutosize
                        aria-label="empty textarea"
                        placeholder="Enter your message here"
                        minRows={5}
                        style={{ width: '100%' }}
                        onChange={handleChange}
                    />

                    <Box sx={{ display: 'inline-flex', pl: 2 }}>
                        <LoadingButton
                            onClick={handleClick}
                            endIcon={<SendIcon />}
                            loading={loading}
                            loadingPosition="end"
                            variant="contained"
                            sx={{ color: theme.palette.secondary.main }}
                        >
                            Decipher
                        </LoadingButton>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', width: '100%', pt: 2 }}>
                        <TextareaAutosize
                            aria-label="empty textarea"
                            placeholder="Deciphered message will appear here"
                            minRows={5}
                            style={{ width: '100%' }}
                            value={cipheredMessage}
                        />

                    </Box>
            </Box>
            <Box sx={{display: 'flex', pl:5}}>
            <img width='320px' src={PigeonKey} alt='PigeonKey' />
            </Box>
            </Box>
        </div>
    );
}
