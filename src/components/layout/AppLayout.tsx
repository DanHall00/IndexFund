import { Box } from '@mui/material';
import React, { useState } from 'react';
import DrawerHeader from './DrawerHeader';
import Header from './Header';
import Navbar from './Navbar';

/**
 * Interface that defines the props for AppLayout
 *
 * @interface IAppLayoutProps
 */
interface IAppLayoutProps {
	children: React.ReactNode;
}

// Hard coded drawer width
const drawerWidth = 240;

/**
 * Layout component that wraps app pages
 *
 * @param {IAppLayoutProps} { children } Inside components
 * @return {*} React Component
 */
const AppLayout = ({ children }: IAppLayoutProps) => {
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
	 * RENDER COMPONENT
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
};

export default AppLayout;
