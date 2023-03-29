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
import Header from './Header';
import Navbar from './Navbar';

interface IAppLayoutProps {
	children: React.ReactNode;
}

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
	open?: boolean;
}>(({ theme, open }) => ({
	flexGrow: 1,
	padding: theme.spacing(3),
	transition: theme.transitions.create('margin', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	marginLeft: `-${drawerWidth}px`,
	...(open && {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	}),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: 'flex-end',
}));

export default function AppLayout({ children }: IAppLayoutProps) {
	// State
	const [drawerOpen, setDrawerOpen] = useState(false);

	const handleDrawerOpen = () => {
		setDrawerOpen(true);
	};

	const handleDrawerClose = () => {
		setDrawerOpen(false);
	};

	return (
		<>
			<Header
				drawerState={{ drawerOpen, setDrawerOpen }}
				handleDrawerOpen={handleDrawerOpen}
			/>
			<Navbar
				drawerHeader={DrawerHeader}
				drawerState={{ drawerOpen, setDrawerOpen }}
				handleDrawerOpen={handleDrawerOpen}
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
