import { createTheme } from '@mui/material/styles';


const themes = createTheme({
    palette: {
        primary: {
            light: '#91C8E4',
            main: '#749BC2',
            dark: '#4682A9',
            contrastText: '#000',
        },
        secondary: {
            light: '#F6F4EB',
            main: '#3f50b5',
            dark: '#002884',
            contrastText: '#fff',
        },
    },
});

export default themes;
