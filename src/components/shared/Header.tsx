import { Menu } from '@mui/icons-material';
import { Box, Button, IconButton } from '@mui/material';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';

interface IHeader {
	isDrawer: boolean;
	setDrawerState: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({ isDrawer, setDrawerState }: IHeader) {
	const router = useRouter();
	return (
		<Box
			sx={{
				mb: 4,
				display: 'flex',
				justifyContent: 'space-between',
				gap: 3,
			}}
		>
			<Box>
				{isDrawer && (
					<>
						<IconButton onClick={() => setDrawerState(true)}>
							<Menu />
						</IconButton>
					</>
				)}
			</Box>

			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					gap: 3,
				}}
			>
				<Button
					variant="text"
					color="secondary"
					sx={{ fontWeight: 600 }}
					onClick={() => {
						router.push('/account');
					}}
				>
					Your Account
				</Button>
				<Button
					variant="text"
					onClick={() => {
						signOut();
					}}
					sx={{ fontWeight: 600 }}
				>
					Log Out
				</Button>
			</Box>
		</Box>
	);
}
