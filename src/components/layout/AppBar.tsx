import {
	AppBar as MuiAppBar,
	AppBarProps as MuiAppBarProps,
	styled,
} from '@mui/material';

/*
 * ----------------------------------------------------------------------------------
 * STYLED APPBAR
 * ----------------------------------------------------------------------------------
 */

/**
 * Interface that defines the props for the styled appbar
 *
 * @interface AppBarProps
 * @extends {MuiAppBarProps}
 */
interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
	drawerWidth: number;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open, drawerWidth }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

export default AppBar;
