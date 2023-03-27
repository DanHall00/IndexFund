import { AppBar, Box, Container, Toolbar } from '@mui/material';
import React from 'react';

interface IAuthLayoutProps {
	children: React.ReactNode;
}

export default function AuthLayout({ children }: IAuthLayoutProps) {
	return (
		<>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexGrow: 1,
				}}
			>
				<Container maxWidth="sm">{children}</Container>
			</Box>
		</>
	);
}
