import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

export const UnderLoad = () => {

  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', width: '100%'}}>
      <CircularProgress style={{color: theme.palette.secondary.main, margin: 'auto'}}/>
    </Box>
  )
}
