import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { useTheme } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from 'react';
import axios from 'axios';
import PigeonCage from './PigeonCage.svg';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function SimpleContainer() {
    const theme = useTheme()
    const [message, setMessage] = useState('');
    const [n, setN] = useState('');
    const [e, setE] = useState('');
    const [loading, setLoading] = useState(false);
    const [cipheredMessage, setCipheredMessage] = useState('');
    const isLogged = useSelector(state => state.isLogged);
    const history = useHistory();

    const handleClick = () => {
        setLoading(true);

        if (message === '' || n === '' || e === '') {
            alert('Please fill all required fields')
            setLoading(false)
        } else {
            axios({
                method: 'post',
                url: 'http://127.0.0.1:5000/message/encipher',
                data: {
                    message: message,
                    n: n,
                    e: e
                }
            }).then(res => {
                console.log(res.data);
                setCipheredMessage(res.data.response)
                console.log(cipheredMessage)
            }).catch(err => {
                console.log(err)
            }).finally(() => {
                setLoading(false)
            })
        }

    };

    const handleChange = (event) => {
        const value = event.target.value
        if (value === "" || value.match(/^[0-9]+$/) || value.match(/^[A-Z]+$/) || value.match(/^[a-z]+$/)) {
            setMessage(event.target.value);
        }else{
            alert('Invalid input format. Please enter only numbers and letters without commas.')
        }
    }

    const handleChangeN = (event) => {
        const value = event.target.value
        if (value === "" || value.match(/^[0-9]+$/)) {
            setN(value)
        }
    }
    const handleChangeE = (event) => {
        const value = event.target.value
        if (value === "" || value.match(/^[0-9]+$/)) {
            setE(value)
        }
    }

    return (
        <div style={{width: '100%'}}>


            <Box sx={{display: 'inline-flex', pl: 5}}>
                <Typography variant="h5" component="div" color='textPrimary'>
                    ENCIPHER YOUR <span style={{color: theme.palette.secondary.main}}> MESSAGE </span> FOR <span
                    style={{color: theme.palette.secondary.main}}> FREE </span>
                </Typography>

                <Box sx={{display: 'inline-flex', width: '100%', pl: 10, pr: 10}}>
                    <TextareaAutosize
                        value={message}
                        aria-label="empty textarea"
                        placeholder="Enter your message here"
                        minRows={5}
                        style={{width: '80%'}}
                        onChange={handleChange}
                    />
                    <TextareaAutosize
                        value={n}
                        aria-label="empty textarea"
                        placeholder="Enter n value here"
                        minRows={5}
                        style={{width: '10%'}}
                        onChange={handleChangeN}
                    />

                    <TextareaAutosize
                        value={e}
                        aria-label="empty textarea"
                        placeholder="Enter e value here"
                        minRows={5}
                        style={{width: '10%'}}
                        onChange={handleChangeE}
                    />


                    <Box sx={{display: 'inline-flex', pl: 2}}>
                        <LoadingButton
                            onClick={handleClick}
                            endIcon={<SendIcon/>}
                            loading={loading}
                            loadingPosition="end"
                            variant="contained"
                            sx={{color: theme.palette.secondary.main}}
                        >
                            Encipher
                        </LoadingButton>
                    </Box>

                </Box>

            </Box>

            <Box sx={{display: 'flex', pl: 5}}>
                <img width='320px' src={PigeonCage} alt="PigeonCage"/>

                <Box sx={{display: 'flex', width: '100%', pl: 10, pr: 10, pt: 10}}>
                    <TextareaAutosize
                        aria-label="empty textarea"
                        placeholder="Your enciphered message will appear here"
                        minRows={5}
                        style={{width: '100%'}}
                        value={cipheredMessage}
                    />

                </Box>
            </Box>
        </div>
    );
}
