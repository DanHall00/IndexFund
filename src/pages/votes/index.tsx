import AppLayout from '@/components/layout/AppLayout';
import VoteTable from '@/components/votes/VoteTable';
import { getVotingHistory } from '@/modules/votes/vote.service';
import { Box, CircularProgress, Typography } from '@mui/material';
import Head from 'next/head';
import { useQuery } from 'react-query';

/**
 * Page for /votes
 *
 * @return {*}
 */
const Votes = () => {
	/*
	 * ----------------------------------------------------------------------------------
	 * REACT QUERY
	 * ----------------------------------------------------------------------------------
	 */
	const {
		data: voteHistory,
		isLoading: voteHistoryIsLoading,
		isFetching: voteHistoryIsFetching,
	} = useQuery(['voteHistory'], getVotingHistory, {
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
				<title>Voting History</title>
			</Head>
			<AppLayout>
				<Typography variant="h3" gutterBottom>
					Voting History
				</Typography>
				{!voteHistoryIsLoading && !voteHistoryIsFetching ? (
					voteHistory && !voteHistory.error ? (
						voteHistory.length > 0 ? (
							<VoteTable votes={voteHistory} />
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
									}}
								>
									<Typography variant="subtitle1">
										You currently haven&apos;t voted in any ballots, when you do
										your votes will appear here.
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
									An error occured while retrieving your votes, please try again
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
						<Typography variant="subtitle1">Loading Your Votes</Typography>
					</Box>
				)}
			</AppLayout>
		</>
	);
};

export default Votes;
