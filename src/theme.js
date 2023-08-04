import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',  
      light: '#757de8', 
      dark: '#002984',  
      contrastText: '#fff', 
    },
    secondary: {
      main: '#ff5722',  
      light: '#ff8a50', 
      dark: '#c41c00',  
      contrastText: '#fff', 
    },
  },
});

export default theme;