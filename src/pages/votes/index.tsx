import AppLayout from '@/components/layout/AppLayout';
import Shortcut from '@/components/shared/Shortcut';
import VoteTable from '@/components/votes/VoteTable';
import { IVoteDoc } from '@/modules/votes/vote.interfaces';
import { getVotingHistory } from '@/modules/votes/vote.service';
import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Chip,
	CircularProgress,
	Grid,
	Table,
	TableCell,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

export default function History() {
	const router = useRouter();
	const {
		data: voteHistory,
		isLoading: voteHistoryIsLoading,
		isFetching: voteHistoryIsFetching,
	} = useQuery(['voteHistory'], getVotingHistory, {
		refetchOnWindowFocus: false,
	});

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
}
