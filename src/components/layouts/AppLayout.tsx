import {
	AppBar,
	Box,
	Container,
	Toolbar,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import SideNav from '../navigation/SideNav';
import Header from '../shared/Header';

interface IAppLayoutProps {
	children: React.ReactNode;
}

export default function AppLayout({ children }: IAppLayoutProps) {
	// Hooks
	const theme = useTheme();
	const isXL = useMediaQuery(theme.breakpoints.up('xl'));

	// State
	const [drawerState, setDrawerState] = useState(false);

	return (
		<>
			<Container
				maxWidth="md"
				sx={{
					bgcolor: '#F9F9F9',
					height: '100vh',
					boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.25)',
					position: 'relative',
				}}
			>
				<Toolbar sx={{ mb: 2 }} />
				<Header isDrawer={!isXL} setDrawerState={setDrawerState} />
				<SideNav
					isDrawer={!isXL}
					drawerState={drawerState}
					setDrawerState={setDrawerState}
				/>
				{children}
			</Container>
		</>
	);
}
