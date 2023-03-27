import '@fontsource/cabin';
import { AppBar, Box, CssBaseline, Toolbar, Typography } from '@mui/material';
import {
	ThemeProvider,
	createTheme,
	responsiveFontSizes,
} from '@mui/material/styles';
import React from 'react';

let innerTheme = createTheme({
	palette: {
		primary: {
			main: '#E9AF59',
		},
		secondary: {
			main: '#C7C7C7',
		},
	},
	typography: {
		fontFamily: '"Cabin", sans-serif',
		allVariants: {
			color: '#3F3F3F',
		},
	},
});

innerTheme = responsiveFontSizes(innerTheme);

export default function AppThemeProvider(props: { children: React.ReactNode }) {
	const { children } = props;
	return (
		<ThemeProvider theme={innerTheme}>
			<CssBaseline />
			<Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
				<AppBar position="absolute" sx={{ bgcolor: '#DC6262' }}>
					<Toolbar sx={{ justifyContent: 'center' }}>
						<Typography variant="h6" sx={{ fontWeight: 800 }} color={'white'}>
							This is a dummy site for testing purposes only. Any data inputted
							may not be securely stored.
						</Typography>
					</Toolbar>
				</AppBar>
				{children}
			</Box>
		</ThemeProvider>
	);
}
