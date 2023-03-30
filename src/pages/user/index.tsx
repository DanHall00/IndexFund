import AppLayout from '@/components/layout/AppLayout';
import Shortcut from '@/components/shared/Shortcut';
import { IUserDoc } from '@/modules/users/user.interfaces';
import { getAllUsers } from '@/modules/users/user.service';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useQuery } from 'react-query';

/**
 * Page for /user
 *
 * @return {*}
 */
const Users = () => {
	/*
	 * ----------------------------------------------------------------------------------
	 * HOOKS
	 * ----------------------------------------------------------------------------------
	 */
	const { data: session } = useSession();

	/*
	 * ----------------------------------------------------------------------------------
	 * REACT QUERY
	 * ----------------------------------------------------------------------------------
	 */
	const {
		data: allUsers,
		isLoading: allUsersLoading,
		isFetching: allUsersFetching,
	} = useQuery(['users'], getAllUsers, { refetchOnWindowFocus: false });

	/*
	 * ----------------------------------------------------------------------------------
	 * ADMIN ONLY ROUTE PROTECTION
	 * ----------------------------------------------------------------------------------
	 */
	if (session?.user.role !== 'admin') {
		return (
			<>
				<Head>
					<title>Error</title>
				</Head>
				<AppLayout>
					<Typography variant="h2">403 Forbidden</Typography>
					<Typography variant="subtitle1">
						You do not have permission to view this page
					</Typography>
				</AppLayout>
			</>
		);
	}

	/*
	 * ----------------------------------------------------------------------------------
	 * RENDER COMPONENT
	 * ----------------------------------------------------------------------------------
	 */
	return (
		<>
			<Head>
				<title>Users</title>
			</Head>
			<AppLayout>
				<Typography variant="h3" gutterBottom>
					Users
				</Typography>
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
};

export default Users;
