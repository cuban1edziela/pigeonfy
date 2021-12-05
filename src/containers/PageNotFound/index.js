import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SadPigeon from './sadpigeon.svg';

export default function PageNotFound() {

    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <Typography variant="h4" sx={{ m: 'auto' }}>
                404 Page not found
            </Typography>

            <Box sx={{ display: 'inline-flex', m: 'auto' }}>
                <img src={SadPigeon} alt='SadPigeon'/>
            </Box>

        </Box>
    )
}