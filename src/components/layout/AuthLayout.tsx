import {
	Box,
	Container,
	Divider,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import React from 'react';

/**
 * Interface to define props used in AuthLayout
 *
 * @interface IAuthLayoutProps
 */
interface IAuthLayoutProps {
	children: React.ReactNode;
}

/**
 * Layout component that wraps Auth pages
 *
 * @param {IAuthLayoutProps} { children } Inside Component
 * @return {*} React Component
 */
const AuthLayout = ({ children }: IAuthLayoutProps) => {
	/*
	 * ----------------------------------------------------------------------------------
	 * STYLE HOOKS
	 * ----------------------------------------------------------------------------------
	 */
	const theme = useTheme();
	const isLG = useMediaQuery(theme.breakpoints.up('lg'));

	/*
	 * ----------------------------------------------------------------------------------
	 * RENDER COMPONENT
	 * ----------------------------------------------------------------------------------
	 */
	return (
		<>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					flexGrow: 1,
					height: '100vh',
				}}
			>
				<Container
					maxWidth="xl"
					sx={{
						display: 'flex',
						justifyContent: isLG ? 'start' : 'center',
						alignItems: 'center',
						height: '80vh',
					}}
				>
					<Box sx={{ width: '50%' }}>{children}</Box>
					{isLG && (
						<>
							<Divider orientation="vertical" sx={{ mx: 10 }} />
							<Box
								sx={{
									display: 'flex',
									alignItems: 'start',
									height: '100%',
									flexDirection: 'column',
									py: 20,
								}}
							>
								<Typography variant="h2" gutterBottom>
									Index Fund Assessment Project
								</Typography>
								<Typography variant="body1" gutterBottom>
									This website is part of an assessment to assess frontend
									skills. Any data entered on this site is for demonstration
									purposes only and should not be treated as a live site.
								</Typography>
								<Typography variant="body1" gutterBottom>
									Majority of current day security standards have been
									implemented to ensure that any data is secure, however due to
									the nature of this project, it may be open to vulnerabilities
									which have not been considered.
								</Typography>
								<Typography variant="body1" color="error">
									THIS IS NOT A LIVE TRADING PLATFORM
								</Typography>
							</Box>
						</>
					)}
				</Container>
			</Box>
		</>
	);
};

export default AuthLayout;
