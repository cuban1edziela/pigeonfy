import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { logoutFromApp } from '../../services/session';
import { UnderLoad } from '../loading';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import { useTheme } from '@mui/material/styles';
import { UpdateProfile } from '../../services/updateProfile';
import { getKeys } from '../../services/getKeys';

export default function InputWithIcon() {

    const theme = useTheme();
    const session = useSelector(state => state.session);
    const history = useHistory();
    const dispatch = useDispatch();

    const handleKeys = () => {
        getKeys(session.user.uid);
    }

    const handleUpdateProfile = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const newProfile = {
            name: data.get('name'),
            email: data.get('email')
        };

        UpdateProfile(newProfile)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        await dispatch(logoutFromApp())
    };

    if (session.error && session.error.message) {
        return (
            toast(session.error.message)
        );
    }
    if (session.loading) {
        return UnderLoad()
    }
    if (session.isAuthenticated === false) {
        history.push('/')
    }

    return (
        <Box sx={{ '& > :not(style)': { m: 1 } }}>

            <h1>Welcome <span style={{ color: theme.palette.secondary.main }}> {session.user?.displayName} </span></h1>
            <Box display='inline-flex' component='form' onSubmit={handleUpdateProfile}>
                <TextField
                    id="email"
                    name='email'
                    label={session.user?.email}
                />
                <TextField
                    id="name"
                    name='name'
                    label={session.user?.displayName}
                    sx={{ml: '20px'}}
                />
            </Box>

            <Box sx={{ display: 'inline-flex', pl: 5 }}>
                <Avatar alt={session.user?.displayName} src="/static/images/avatar/3.jpg" />
            </Box>

            <Box sx={{ display: 'inline-flex', pl: 5 }}>
                <Button
                    variant='outlined'
                    onClick={handleSubmit}
                    color="secondary">
                    LOG OUT
                </Button>
                <Button 
                    sx={{ml: 5}}
                    variant='outlined'
                    onClick={handleKeys}
                    color="secondary">
                    GET KEYS
                </Button>
            </Box>

        </Box>
    );
}
