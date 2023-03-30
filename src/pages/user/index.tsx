import AppLayout from '@/components/layout/AppLayout';
import Shortcut from '@/components/shared/Shortcut';
import { IStockDoc } from '@/modules/stocks/stock.interfaces';
import { IUserDoc } from '@/modules/users/user.interfaces';
import { getAllUsers } from '@/modules/users/user.service';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

export default function Users() {
	const router = useRouter();
	const { data: session } = useSession();

	const {
		data: allUsers,
		isLoading: allUsersLoading,
		isFetching: allUsersFetching,
	} = useQuery(['users'], getAllUsers, { refetchOnWindowFocus: false });

	return (
		<>
			<Head>
				<title>Users</title>
			</Head>
			<AppLayout>
				<Typography variant="h3" gutterBottom>
					Users
				</Typography>
				<Box sx={{ display: 'flex', justifyContent: 'end', mb: 2 }}>
					<Button variant="contained" onClick={() => {}} color="secondary">
						Create Stock
					</Button>
				</Box>
				{!allUsersLoading && !allUsersFetching ? (
					allUsers ? (
						allUsers.length > 0 ? (
							<>
								<Grid container spacing={3}>
									{allUsers.map((item: IUserDoc) => (
										<Shortcut
											key={item.id}
											title={`${item.username}`}
											description={`${item.role}`}
										/>
									))}
								</Grid>
							</>
						) : (
							<>
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'center',
										flexDirection: 'column',
										textAlign: 'center',
										gap: 2,
									}}
								>
									<Typography variant="subtitle1">
										Looks like there are currently no stocks available.
									</Typography>
								</Box>
							</>
						)
					) : (
						<>
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'center',
									flexDirection: 'column',
									alignItems: 'center',
									textAlign: 'center',
									gap: 2,
								}}
							>
								<Typography variant="subtitle1">
									An error occured while retrieving stocks, please try again
									later.
								</Typography>
							</Box>
						</>
					)
				) : (
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							flexDirection: 'column',
							alignItems: 'center',
							textAlign: 'center',
							gap: 2,
						}}
					>
						<CircularProgress variant="indeterminate" />
						<Typography variant="subtitle1">Loading Stocks</Typography>
					</Box>
				)}
			</AppLayout>
		</>
	);
}
