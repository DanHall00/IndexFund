import {
	AccountBalance,
	Ballot,
	Business,
	ChevronLeft as ChevronLeftIcon,
	ChevronRight as ChevronRightIcon,
	Dashboard,
	History as HistoryIcon,
	People,
	ShowChart,
} from '@mui/icons-material';
import {
	Divider,
	IconButton,
	List,
	ListSubheader,
	useTheme,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import React from 'react';
import Drawer from './Drawer';
import DrawerHeader from './DrawerHeader';
import NavButton from './NavButton';

interface INavbarProps {
	drawerWidth: number;
	drawerState: {
		drawerOpen: boolean;
		setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
	};
	handleDrawerClose: () => void;
}

export default function Navbar({
	drawerWidth,
	drawerState,
	handleDrawerClose,
}: INavbarProps) {
	const { drawerOpen } = drawerState;
	/*
	 * ----------------------------------------------------------------------------------
	 * HOOKS
	 * ----------------------------------------------------------------------------------
	 */
	const { data: session } = useSession();
	const theme = useTheme();

	/*
	 * ----------------------------------------------------------------------------------
	 * RETURN VIEW
	 * ----------------------------------------------------------------------------------
	 */
	return (
		<Drawer variant="permanent" open={drawerOpen} drawerWidth={drawerWidth}>
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
					path="ballots"
					label="Ballots"
					icon={Ballot}
					drawerOpen={drawerOpen}
				/>
				<NavButton
					path="votes"
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
						<NavButton
							path="user"
							label="User"
							icon={People}
							drawerOpen={drawerOpen}
						/>
					</List>
				</>
			)}
		</Drawer>
	);
}
