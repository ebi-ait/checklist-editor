import { defaultTheme } from 'react-admin';
// EBI visual styles taken from https://stable.visual-framework.dev/
export const appTheme = {
    ...defaultTheme,
    palette: {
    //     mode: 'light',
        primary: {main: '#18974c'},
        secondary: {main: '#0a5032'},
        error: {main: '#d32f2f'},
        background: {main: '#fffadc'},
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
