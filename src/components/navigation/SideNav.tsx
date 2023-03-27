import { Close } from '@mui/icons-material';
import { Box, Divider, Drawer, IconButton } from '@mui/material';
import React from 'react';
import NavHeader from './NavHeader';
import NavMenu from './NavMenu';

interface ISideNav {
	isDrawer: boolean;
	drawerState: boolean;
	setDrawerState: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SideNav({
	isDrawer,
	drawerState,
	setDrawerState,
}: ISideNav) {
	return (
		<>
			{isDrawer ? (
				<>
					<Drawer
						anchor="left"
						open={drawerState}
						onClose={() => setDrawerState(false)}
					>
						<Box sx={{ position: 'absolute', right: '10px', top: '10px' }}>
							<IconButton onClick={() => setDrawerState(false)}>
								<Close />
							</IconButton>
						</Box>
						<Box sx={{ width: 300, pt: 5 }}>
							<Box sx={{ mx: 2 }}>
								<NavHeader />
							</Box>
							<Divider sx={{ mt: 2, mb: 3 }} />
							<NavMenu />
						</Box>
					</Drawer>
				</>
			) : (
				<Box
					sx={{
						top: '250px',
						left: '-300px',
						width: '280px',
						position: 'absolute',
					}}
				>
					<NavHeader />
					<Divider sx={{ mt: 2, mb: 3 }} />
					<NavMenu />
				</Box>
			)}
		</>
	);
}
