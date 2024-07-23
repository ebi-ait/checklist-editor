import { defaultTheme } from 'react-admin';
// EBI visual styles taken from https://stable.visual-framework.dev/
export const appTheme = {
    ...defaultTheme,
    palette: {
    //     mode: 'light',
        primary: {main: '#6cc24a'},
        secondary: {main: '#007b53'},
        error: {main: '#d32f2f'},
    },
    typography: {
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            'IBM Plex Sans',
            'Arial',
            'sans-serif',
        ].join(','),
    },
};
