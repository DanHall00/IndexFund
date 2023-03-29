import AppLayout from '@/components/layout/AppLayout';
import Shortcut from '@/components/shared/Shortcut';
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
							<>
								{/* <Grid container spacing={3}>
								{voteHistory.map((item: IVoteDoc) => (
									<Grid key={item.id} item xs={12}>
										<Card>
											<CardHeader
												title={item.ballot.title}
												subheader={
													<Chip label={item.ballot.category} size="small" />
												}
												titleTypographyProps={{ mb: 1 }}
											/>
											<CardContent>
												<Typography variant="body1">
													{item.ballot.description}
												</Typography>
											</CardContent>
										</Card>
									</Grid>
								))}
							</Grid> */}
								<Table>
									<TableHead>
										<TableRow>
											<TableCell>Vote Date</TableCell>
											<TableCell>Ballot Title</TableCell>
											<TableCell>Ballot Description</TableCell>
											<TableCell>Ballot Category</TableCell>
											<TableCell>Action</TableCell>
											<TableCell align="right"></TableCell>
										</TableRow>
									</TableHead>
									{voteHistory.map((item: IVoteDoc & { createdAt: string }) => (
										<TableRow
											key={item.id}
											sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
										>
											<TableCell component="th" scope="row">
												{new Date(item.createdAt).toLocaleDateString()}
											</TableCell>
											<TableCell>{item.ballot.title}</TableCell>
											<TableCell>To add</TableCell>
											<TableCell>{item.ballot.category}</TableCell>
											<TableCell>{item.action}</TableCell>
											<TableCell align="right">
												<Button variant="contained">View</Button>
											</TableCell>
										</TableRow>
									))}
								</Table>
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
										Looks like you currently aren&apos;t invested in any funds.
									</Typography>
									<Button
										variant="contained"
										sx={{ color: 'white' }}
										onClick={() => router.push('/funds')}
									>
										Invest
									</Button>
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
									textAlign: 'center',
									gap: 2,
								}}
							>
								<Typography variant="subtitle1">
									An error occured while retrieving your funds, please try again
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
							textAlign: 'center',
							gap: 2,
						}}
					>
						<CircularProgress variant="indeterminate" />
						<Typography variant="subtitle1">Loading Your Funds</Typography>
					</Box>
				)}
			</AppLayout>
		</>
	);
}
