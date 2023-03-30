import { Logout, Menu as MenuIcon, Person } from '@mui/icons-material';
import { Box, IconButton, Popover, Toolbar, Typography } from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import AppBar from './AppBar';

/**
 * Interface to define props for the Header
 *
 * @interface IHeaderProps
 */
interface IHeaderProps {
	drawerState: {
		drawerOpen: boolean;
		setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
	};
	handleDrawerOpen: () => void;
	drawerWidth: number;
}

/**
 * Component for top header bar in page
 *
 * @param {IHeaderProps} {
 * 	drawerState,
 * 	handleDrawerOpen,
 * 	drawerWidth,
 * }
 * @return {*} React Component
 */
const Header = ({
	drawerState,
	handleDrawerOpen,
	drawerWidth,
}: IHeaderProps) => {
	const { drawerOpen }: { drawerOpen: boolean } = drawerState;
	/*
	 * ----------------------------------------------------------------------------------
	 * HOOKS
	 * ----------------------------------------------------------------------------------
	 */
	const { data: session } = useSession();
	const router = useRouter();

	/*
	 * ----------------------------------------------------------------------------------
	 * ACCOUNT POPOVER FUNCTIONALITY
	 * ----------------------------------------------------------------------------------
	 */
	const [accountAnchorEl, setAccountAnchorEl] = useState<HTMLElement | null>(
		null
	);

	const handleAccountPopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAccountAnchorEl(event.currentTarget);
	};

	const handleAccountPopoverClose = () => {
		setAccountAnchorEl(null);
	};
	const accountOpen = Boolean(accountAnchorEl);

	/*
	 * ----------------------------------------------------------------------------------
	 * LOGOUT POPOVER FUNCTIONALITY
	 * ----------------------------------------------------------------------------------
	 */
	const [logoutAnchorEl, setLogoutAnchorEl] = useState<HTMLElement | null>(
		null
	);
	const handleLogoutPopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
		setLogoutAnchorEl(event.currentTarget);
	};

	const handleLogoutPopoverClose = () => {
		setLogoutAnchorEl(null);
	};
	const logoutOpen = Boolean(logoutAnchorEl);

	/*
	 * ----------------------------------------------------------------------------------
	 * RENDER COMPONENT
	 * ----------------------------------------------------------------------------------
	 */
	return (
		<>
			<AppBar
				position="fixed"
				open={drawerOpen}
				color="primary"
				drawerWidth={drawerWidth}
			>
				<Toolbar sx={{ justifyContent: 'space-between' }}>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={handleDrawerOpen}
							edge="start"
							sx={{ mr: 2, ...(drawerOpen && { display: 'none' }) }}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h4" noWrap component="div">
							Index Fund Assessment
						</Typography>
					</Box>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: 2,
						}}
					>
						<Typography variant="h6">Account Number: </Typography>
						<Typography variant="body1">
							{session?.user.account_number}
						</Typography>
						<IconButton
							aria-owns={accountOpen ? 'account-popover' : undefined}
							aria-haspopup="true"
							onMouseEnter={handleAccountPopoverOpen}
							onMouseLeave={handleAccountPopoverClose}
							onClick={async () => {
								router.push('/account');
							}}
						>
							<Person />
						</IconButton>
						<Popover
							id="account-popover"
							sx={{
								pointerEvents: 'none',
								mt: 1,
							}}
							open={accountOpen}
							anchorEl={accountAnchorEl}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'center',
							}}
							transformOrigin={{
								vertical: 'top',
								horizontal: 'center',
							}}
							onClose={handleAccountPopoverClose}
							disableRestoreFocus
						>
							<Typography sx={{ p: 1 }}>Account</Typography>
						</Popover>
						<IconButton
							aria-owns={logoutOpen ? 'logout-popover' : undefined}
							aria-haspopup="true"
							onMouseEnter={handleLogoutPopoverOpen}
							onMouseLeave={handleLogoutPopoverClose}
							onClick={async () => {
								await signOut();
							}}
						>
							<Logout />
						</IconButton>
						<Popover
							id="logout-popover"
							sx={{
								pointerEvents: 'none',
								mt: 1,
							}}
							open={logoutOpen}
							anchorEl={logoutAnchorEl}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'center',
							}}
							transformOrigin={{
								vertical: 'top',
								horizontal: 'center',
							}}
							onClose={handleLogoutPopoverClose}
							disableRestoreFocus
						>
							<Typography sx={{ p: 1 }}>Logout</Typography>
						</Popover>
					</Box>
				</Toolbar>
			</AppBar>
		</>
	);
};

export default Header;
