import { createMuiTheme } from 'material-ui/styles';
import { TypographyOptions } from 'material-ui/styles/createTypography';

const typography: TypographyOptions = {
  fontFamily: 'Roboto,Helvetica Neue Light,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif'
};

export const lightTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#3f51b5',
      light: '#757de8',
      dark: '#002984',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#f50057',
      light: '#ff5983',
      dark: '#bb002f',
      contrastText: '#000000'
    },
    type: 'light'
  },
  typography
});

export const darkTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#607d8b',
      light: '#8eacbb',
      dark: '#34515e',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#ffd740',
      light: '#ffff74',
      dark: '#c8a600',
      contrastText: '#000000'
    },
    type: 'dark'
  },
  typography
});
