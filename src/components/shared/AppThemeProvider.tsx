import '@fontsource/cabin';
import { Box, CssBaseline } from '@mui/material';
import {
	ThemeProvider,
	createTheme,
	responsiveFontSizes,
} from '@mui/material/styles';
import React from 'react';

/*
 * ----------------------------------------------------------------------------------
 * GLOBAL COLOURS
 * ----------------------------------------------------------------------------------
 */
const primary = '#E85C27';
const secondary = '#2f699f';

const background = '#0c0e0f';
const text = '#f8e5d5';

/*
 * ----------------------------------------------------------------------------------
 * CREATE THEME WITH STYLING
 * ----------------------------------------------------------------------------------
 */

let innerTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: primary,
		},
		secondary: {
			main: secondary,
		},
		background: {
			default: background,
		},
	},
	typography: {
		fontFamily: '"Cabin", sans-serif',
		h1: {
			color: primary,
		},
		h2: {
			color: primary,
		},
		h3: {
			color: primary,
		},
		h4: {
			color: primary,
		},
		h5: {
			color: primary,
		},
		h6: {
			color: primary,
		},
		subtitle1: {
			color: text,
		},
		subtitle2: {
			color: text,
		},
	},
});

/*
 * ----------------------------------------------------------------------------------
 * RESPONSIVE FONTS
 * ----------------------------------------------------------------------------------
 */

innerTheme = responsiveFontSizes(innerTheme);

/**
 * Interface to define the props for AppThemeProvider
 *
 * @interface IAppThemeProviderProps
 */
interface IAppThemeProviderProps {
	children: React.ReactNode;
}

/**
 * Component for configuring MUI styling to use across the application
 *
 * @param {{ children: React.ReactNode }} props
 * @return {*}
 */
const AppThemeProvider = ({ children }: IAppThemeProviderProps) => {
	/*
	 * ----------------------------------------------------------------------------------
	 * RENDER COMPONENT
	 * ----------------------------------------------------------------------------------
	 */
	return (
		<ThemeProvider theme={innerTheme}>
			<CssBaseline />
			<Box sx={{ display: 'flex' }}>{children}</Box>
		</ThemeProvider>
	);
};

export default AppThemeProvider;
