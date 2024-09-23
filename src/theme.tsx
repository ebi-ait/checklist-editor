import {
    defaultTheme,
} from 'react-admin';
import {
    alpha,
    createTheme,
    darken,
    Theme,
} from '@mui/material';
import { RaThemeOptions } from 'ra-ui-materialui/src/theme/types.ts';


// EBI visual styles taken from https://stable.visual-framework.dev/
const componentsOverrides = (theme: Theme) =>
    ({
    ...defaultTheme.components,
        RaMenuItemLink: {
            styleOverrides: {
                root: {
                    padding: 8,
                    marginRight: 2,
                    marginLeft: 10,
                    '&:hover': {
                    borderRight: `3px solid ${theme.palette.secondary.light}`,
                    },
                    '&.RaMenuItemLink-active': {
                        borderRight: `3px solid ${theme.palette.secondary.main}`,
                        marginRight: 2,
                    },
                },
            },
        },

        RaLayout: {
            styleOverrides: {
                root: {
                '& .RaLayout-appFrame': { width: '100vw' },
                '& .RaLayout-contentWithSidebar': {
                    height: "90%",
                        }
                        },
            },
         },

        RaAppBar: {
        styleOverrides: {
            root: {
                '& .RaAppBar-toolbar': {
                    backgroundImage: `linear-gradient(310deg, ${theme.palette.secondary.dark}, ${theme.palette.secondary.main})`,
                        },
                    },
        },
    },

    })

const alert = {
    error: { main: '#d32f2f' },
    warning: { main: '#8C701B' },
    info: { main: '#81c784' },
    success: { main: '#0FBF9F' },
};


const lightPalette = {
    primary: {main: '#3b6fb6', light: '#7928ca'},
    secondary: {main: '#18974c', dark: '#0a5032'},
    background: {default: '#fafafb', paper: '#ffffff'},
    ...alert,
    mode: 'light' as 'light',
}

const darkPalette = {
    primary: {
        main:'#ffffff',
        light:alpha(darken(lightPalette.primary.light, 0.4), 0.2)
    },
    secondary: {
        main: alpha(darken(lightPalette.secondary.main, 0.4), 0.2)
    },
    background: { default: '#363D40', paper: '#474F53' },
    ...alert,
    mode: 'dark' as 'dark',
};

const createAppTheme = (palette: RaThemeOptions['palette']) => {
    const themeOptions = {
        palette,
        shape: { borderRadius: 20 },
        sidebar: { width: 200 },
        // spacing: 9,
        typography: {fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            'IBM Plex Sans Bold',
            'Arial',
            'sans-serif',
        ].join(','), },

    };
    const theme = createTheme(themeOptions);
    theme.components = componentsOverrides(theme) ;
    return theme;
};

export const appTheme = createAppTheme(lightPalette);
export const darkTheme = createAppTheme(darkPalette);








