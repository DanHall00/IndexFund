import BallotTable from '@/components/ballots/BallotTable';
import AppLayout from '@/components/layout/AppLayout';
import {
	getAvailableBallots,
	getUpcomingBallots,
} from '@/modules/ballots/ballot.service';
import { Box, CircularProgress, Typography } from '@mui/material';
import Head from 'next/head';
import { useQuery } from 'react-query';

const Ballots = () => {
	/*
	 * ----------------------------------------------------------------------------------
	 * REACT QUERY
	 * ----------------------------------------------------------------------------------
	 */
	const {
		data: availableBallots,
		isLoading: availableBallotsLoading,
		isFetching: availableBallotsFetching,
	} = useQuery(['availableBallots'], getAvailableBallots, {
		refetchOnWindowFocus: false,
	});

	const {
		data: upcomingBallots,
		isLoading: upcomingBallotsLoading,
		isFetching: upcomingBallotsFetching,
	} = useQuery(['upcomingBallots'], getUpcomingBallots, {
		refetchOnWindowFocus: false,
	});

	/*
	 * ----------------------------------------------------------------------------------
	 * RENDER COMPONENT
	 * ----------------------------------------------------------------------------------
	 */
	return (
		<>
			<Head>
				<title>Ballots</title>
			</Head>
			<AppLayout>
				<Typography variant="h3" gutterBottom sx={{ mt: 5 }}>
					Available Ballots
				</Typography>
				{!availableBallotsLoading && !availableBallotsFetching ? (
					availableBallots ? (
						availableBallots.length > 0 ? (
							<BallotTable ballots={availableBallots} />
						) : (
							<>
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'center',
										flexDirection: 'column',
										alignContent: 'center',
										textAlign: 'center',
										gap: 2,
										mb: 5,
									}}
								>
									<Typography variant="subtitle1">
										There are currently no available ballots.
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
									An error occured while retrieving ballots, please try again
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
						<Typography variant="subtitle1">Loading Ballots</Typography>
					</Box>
				)}
				<Typography variant="h3" gutterBottom sx={{ mt: 5 }}>
					Upcoming Ballots
				</Typography>
				{!upcomingBallotsLoading && !upcomingBallotsFetching ? (
					upcomingBallots ? (
						upcomingBallots.length > 0 ? (
							<BallotTable ballots={upcomingBallots} hideVoteButton={true} />
						) : (
							<>
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'center',
										flexDirection: 'column',
										alignContent: 'center',
										textAlign: 'center',
										gap: 2,
										mb: 5,
									}}
								>
									<Typography variant="subtitle1">
										There are currently no available ballots.
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
									An error occured while retrieving ballots, please try again
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
						<Typography variant="subtitle1">Loading Ballots</Typography>
					</Box>
				)}
			</AppLayout>
		</>
	);
};

export default Ballots;
