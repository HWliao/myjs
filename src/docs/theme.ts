import { createMuiTheme } from 'material-ui/styles';
import { TypographyOptions } from 'material-ui/styles/createTypography';
import { PaletteOptions } from 'material-ui/styles/createPalette';

const typography: TypographyOptions = {
  fontFamily: 'Roboto,Helvetica Neue Light,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif'
};

const palette: PaletteOptions = {
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
  }
};

export const lightTheme = createMuiTheme({
  palette: {
    ...palette,
    type: 'light'
  },
  typography
});

export const darkTheme = createMuiTheme({
  palette: {
    ...palette,
    type: 'dark'
  },
  typography
});
