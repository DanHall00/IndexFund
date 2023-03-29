import AppLayout from '@/components/layout/AppLayout';
import { getCurrentUser } from '@/modules/users/user.service';
import { Box, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useQuery } from 'react-query';

export default function Account() {
	const { data: session } = useSession();

	const { data: userData } = useQuery(['currentuser'], getCurrentUser, {
		enabled: !!session,
	});

	return (
		<>
			<Head>
				<title>Account</title>
			</Head>
			<AppLayout>
				<Typography variant="h3" gutterBottom>
					Account
				</Typography>
				<Box
					sx={{
						display: 'flex',
						gap: 2,
						flexDirection: 'column',
						textAlign: 'center',
						mt: 5,
					}}
				>
					<Box>
						<Typography variant="h5">Username</Typography>
						<Typography variant="subtitle1">{userData?.username}</Typography>
					</Box>
					<Box>
						<Typography variant="h5">Email</Typography>
						<Typography variant="subtitle1">{userData?.email}</Typography>
					</Box>
					<Box>
						<Typography variant="h5">Account Number</Typography>
						<Typography variant="subtitle1">
							{userData?.account_number}
						</Typography>
					</Box>
					<Box>
						<Typography variant="h5">Account Opened</Typography>
						<Typography variant="subtitle1">
							{userData && new Date(userData.createdAt).toLocaleDateString()}
						</Typography>
					</Box>
				</Box>
			</AppLayout>
		</>
	);
}
