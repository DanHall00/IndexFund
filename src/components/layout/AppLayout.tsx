import {
	AppBar,
	Box,
	Container,
	Toolbar,
	styled,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import DrawerHeader from './DrawerHeader';
import Header from './Header';
import Navbar from './Navbar';

interface IAppLayoutProps {
	children: React.ReactNode;
}

const drawerWidth = 240;

export default function AppLayout({ children }: IAppLayoutProps) {
	/*
	 * ----------------------------------------------------------------------------------
	 * DRAWER FUNCTIONALITY
	 * ----------------------------------------------------------------------------------
	 */
	const [drawerOpen, setDrawerOpen] = useState(false);

	const handleDrawerOpen = () => {
		setDrawerOpen(true);
	};

	const handleDrawerClose = () => {
		setDrawerOpen(false);
	};

	/*
	 * ----------------------------------------------------------------------------------
	 * RETURN VIEW
	 * ----------------------------------------------------------------------------------
	 */
	return (
		<>
			<Header
				drawerWidth={drawerWidth}
				drawerState={{ drawerOpen, setDrawerOpen }}
				handleDrawerOpen={handleDrawerOpen}
			/>
			<Navbar
				drawerWidth={drawerWidth}
				drawerState={{ drawerOpen, setDrawerOpen }}
				handleDrawerClose={handleDrawerClose}
			/>
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<DrawerHeader />
				<Box
					sx={{
						py: 2,
						px: 5,
						flexGrow: 1,
						display: 'flex',
						flexDirection: 'column',
						overflow: 'hidden',
					}}
				>
					{children}
				</Box>
			</Box>
		</>
	);
}
