import {
	AccountBalance,
	Apps,
	Business,
	ChevronLeft as ChevronLeftIcon,
	ChevronRight as ChevronRightIcon,
	Dashboard,
	History as HistoryIcon,
	People,
	Person,
	Schema,
	ShowChart,
	TextSnippet,
} from '@mui/icons-material';
import {
	Divider,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	ListSubheader,
	Drawer as MuiDrawer,
	styled,
	useTheme,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import React from 'react';
import NavButton from './NavButton';

const drawerWidth = 240;

const openedMixin = (theme: any) => ({
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

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }: any) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	...(open && {
		...openedMixin(theme),
		'& .MuiDrawer-paper': openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		'& .MuiDrawer-paper': closedMixin(theme),
	}),
}));

interface INavbarProps {
	drawerHeader: any;
	drawerState: {
		drawerOpen: boolean;
		setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
	};
	handleDrawerClose: () => void;
	handleDrawerOpen: () => void;
}

export default function Navbar({
	drawerHeader: DrawerHeader,
	drawerState,
	handleDrawerClose,
	handleDrawerOpen,
}: INavbarProps) {
	const { data: session } = useSession();
	const { drawerOpen } = drawerState;

	const theme = useTheme();

	return (
		<Drawer variant="permanent" open={drawerOpen}>
			<DrawerHeader>
				<IconButton onClick={handleDrawerClose}>
					{theme.direction === 'rtl' ? (
						<ChevronRightIcon />
					) : (
						<ChevronLeftIcon />
					)}
				</IconButton>
			</DrawerHeader>
			<Divider />
			<List>
				<NavButton
					path=""
					label="Overview"
					icon={Dashboard}
					drawerOpen={drawerOpen}
				/>
				<NavButton
					path="investments"
					label="Investments"
					icon={ShowChart}
					drawerOpen={drawerOpen}
				/>
				<NavButton
					path="history"
					label="Voting History"
					icon={HistoryIcon}
					drawerOpen={drawerOpen}
				/>
			</List>
			{session?.user.role === 'admin' && (
				<>
					<Divider />
					<List
						subheader={
							drawerOpen && (
								<ListSubheader sx={{ bgcolor: 'transparent' }} component="div">
									Admin
								</ListSubheader>
							)
						}
					>
						<NavButton
							path="funds"
							label="Funds"
							icon={AccountBalance}
							drawerOpen={drawerOpen}
						/>
						<NavButton
							path="stock"
							label="Stock"
							icon={Business}
							drawerOpen={drawerOpen}
						/>
					</List>
				</>
			)}
		</Drawer>
	);
}
