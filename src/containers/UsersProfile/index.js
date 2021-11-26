import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { logoutFromApp } from '../../services/session';
import { UnderLoad } from '../loading';
import { useSelector, useDispatch} from 'react-redux';
import { toast } from 'react-toastify';
import { init } from '../../slices/sessionSlice'
import { useHistory } from 'react-router';
import { useTheme } from '@mui/material/styles'

export default function InputWithIcon() {

    const theme = useTheme();
    const session = useSelector(state => state.session);
    const history = useHistory();
    const dispatch = useDispatch();

    dispatch(init())

    const handleSubmit = async (event) => {
        event.preventDefault();
        await dispatch(logoutFromApp())
    };
    
    if(session.error && session.error.message) {
        return (
            toast(session.error.message)
        );
    }
    if (session.loading) {
        return UnderLoad()
    }
    if(session.isAuthenticated === false) {
        history.push('/')
    }

    return (
        <Box sx={{ '& > :not(style)': { m: 1 } }}>

            <h1>Welcome <span style={{color: theme.palette.secondary.main}}> {session.user.displayName} </span></h1>
            
            <FormControl variant="standard">
                <InputLabel htmlFor="input-with-icon-adornment">
                    Email
                </InputLabel>
                <Input
                    id="input-with-icon-adornment"
                    startAdornment={
                        <InputAdornment position="start">
                            <AccountCircle />
                        </InputAdornment>
                    }
                />
            </FormControl>
            <TextField
                id="input-with-icon-textfield"
                label="TextField"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <AccountCircle />
                        </InputAdornment>
                    ),
                }}
                variant="standard"
            />
            <Box sx={{ display: 'inline-flex', pl: 5 }}>
                <Avatar alt={session.user.displayName} src="/static/images/avatar/3.jpg" />
            </Box>

            <Box sx={{ display: 'inline-flex', pl: 5 }}>
                <Button
                    variant='outlined'
                    onClick={handleSubmit}
                    color="secondary">
                    LOG OUT
                </Button>
            </Box>

        </Box>
    );
}
