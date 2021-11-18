import Box from '@mui/material/Box';
import { useTheme } from '@mui/material'


export const AppBox = ({ children }) => {

    const theme = useTheme()

    return (
        <Box component="main" sx={{ backgroundColor: theme.palette.primary.main, flexGrow: 1, p: 3 }}>
            {children}
        </Box>
    )
}