import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import { getAuth, signOut } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { login } from '../../actions';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';

export default function InputWithIcon() {

    const auth = getAuth();
    const history = useHistory();
    const dispatch = useDispatch();

    const logout = () => {
        signOut(auth).then(() => {
            dispatch(login())
            history.push('/')
        }).catch((error) => {
            alert('Couldnt log out. Try again later')
        });
    }


    return (
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
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
                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            </Box>

            <Box sx={{ display: 'inline-flex', pl: 5 }}>
                <Button
                    variant='outlined'
                    onClick={logout}
                    color="secondary">
                    LOG OUT
                </Button>
            </Box>

        </Box>
    );
}
