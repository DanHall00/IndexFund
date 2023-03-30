import {
	Drawer as MuiDrawer,
	DrawerProps as MuiDrawerProps,
	styled,
} from '@mui/material';

/*
 * ----------------------------------------------------------------------------------
 * OPEN AND CLOSE ANIMATIONS
 * ----------------------------------------------------------------------------------
 */

const openedMixin = (theme: any, drawerWidth: number) => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme: any) => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

/*
 * ----------------------------------------------------------------------------------
 * STYLED DRAWER
 * ----------------------------------------------------------------------------------
 */

/**
 * Interface to define props for new styled drawer
 *
 * @interface DrawerProps
 * @extends {MuiDrawerProps}
 */
interface DrawerProps extends MuiDrawerProps {
	open?: boolean;
	drawerWidth: number;
}

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== 'open',
})<DrawerProps>(({ theme, open, drawerWidth }: any) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	...(open && {
		...openedMixin(theme, drawerWidth),
		'& .MuiDrawer-paper': openedMixin(theme, drawerWidth),
	}),
	...(!open && {
		...closedMixin(theme),
		'& .MuiDrawer-paper': closedMixin(theme),
	}),
}));

export default Drawer;
