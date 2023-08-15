import { createTheme } from '@mui/material';
import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    border?: Palette['primary'];
  }
  interface PaletteOptions {
    border?: PaletteOptions['primary'];
  }
}

const common = {
  typography: {
    fontFamily: `'Plus Jakarta Sans', sans-serif`,
    h1: {
      fontWeight: 700,
      fontSize: '24px',
      lineHeight: '30px',
    },
    h2: {
      fontWeight: 700,
      fontSize: '18px',
      lineHeight: '23px',
    },
    h3: {
      fontWeight: 700,
      fontSize: '15px',
      lineHeight: '19px',
    },
    h4: {
      fontWeight: 700,
      fontSize: '12px',
      lineHeight: '15px',
      letterSpacing: '2.4px'
    },
    body1: {
      fontSize: '13px',
      lineHeight: '23px',
    },
    body2: {
      fontWeight: 700,
      fontSize: '12px',
      lineHeight: '15px',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          fontWeight: 'bold',
          textTransform: 'none' as const,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontWeight: 'bold',
        },
      },
    },
  },
};

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      light: '#A8A4FF',
      main: '#635FC7',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FFFFFF',
      contrastText: '#635FC7',
    },
    text: {
      primary: '#FFFFFF',
      secondary: "#828FA3",
    },
    error: {
      main: '#EA5555',
      light: '#FF9898',
    },
    background: {
      paper: '#2B2C37',
      default: '#20212C',
    },
    border: {
      main: '#3E3F4E',
    }
  },
  ...common,
});

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      light: '#A8A4FF',
      main: '#635FC7',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#F4F7FD',
      contrastText: '#635FC7',
    },
    error: {
      main: '#EA5555',
      light: '#FF9898',
    },
    text: {
      primary: '#000112',
      secondary: '#828FA3',
    },
    background: {
      paper: '#FFFFFF',
      default: '#F4F7FD',
    },
    border: {
      main: '#E4EBFA',
    }
  },
  ...common,
});
