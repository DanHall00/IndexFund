import AppLayout from '@/components/layout/AppLayout';
import Shortcut from '@/components/shared/Shortcut';
import VoteChart from '@/components/votes/VoteChart';
import VoteForm from '@/components/votes/VoteForm';
import { IBallotDoc } from '@/modules/ballots/ballot.interfaces';
import { getBallotById } from '@/modules/ballots/ballot.service';
import { IFundDoc } from '@/modules/funds/fund.interfaces';
import { getFundById } from '@/modules/funds/fund.service';
import { IStockDoc } from '@/modules/stocks/stock.interfaces';
import { IVoteDoc, VoteOption } from '@/modules/votes/vote.interfaces';
import { createVote, getVoteById } from '@/modules/votes/vote.service';
import { ArrowBack } from '@mui/icons-material';
import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Chip,
	CircularProgress,
	FormControl,
	FormControlLabel,
	FormLabel,
	Grid,
	IconButton,
	Radio,
	RadioGroup,
	Skeleton,
	Typography,
} from '@mui/material';
import {
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	Title,
	Tooltip,
} from 'chart.js';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const GBPound = new Intl.NumberFormat(undefined, {
	style: 'currency',
	currency: 'GBP',
});

const Ballot = () => {
	const router = useRouter();
	const { id } = router.query;
	const queryClient = useQueryClient();

	const [ballotStatus, setBallotStatus] = useState<string | null>(null);
	const [voteResults, setVoteResults] = useState<{
		For: number;
		Against: number;
		Abstain: number;
		['No Vote']: number;
	}>({
		For: 0,
		Against: 0,
		Abstain: 0,
		['No Vote']: 0,
	});
	const [currentDate, setCurrentDate] = useState(new Date());

	const {
		data: ballot,
		isLoading: ballotLoading,
		isFetching: ballotFetching,
	} = useQuery<{ ballot: IBallotDoc; votes?: any[] | null; vote?: string }>(
		['ballot', id],
		() => getBallotById(id),
		{
			refetchOnWindowFocus: false,
			enabled: !!id,
		}
	);

	const createVoteMutation = useMutation({
		mutationFn: createVote,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['voteHistory'] });
			queryClient.invalidateQueries({
				queryKey: ['ballot', ballot?.ballot.id],
			});
		},
	});

	useEffect(() => {
		if (ballot?.ballot) {
			setBallotStatus(
				new Date(ballot.ballot.ballotStart) < currentDate
					? new Date(ballot.ballot.ballotEnd) > currentDate
						? 'In Progress'
						: 'Finished'
					: 'Not Yet Started'
			);
		}
	}, [ballot]);

	useEffect(() => {
		if (ballot && ballotStatus) {
			if (ballot?.vote && ballot?.vote !== VoteOption.NO_VOTE) {
				if (ballot?.votes) {
					if (Array.isArray(ballot.votes)) {
						const localResults: any = {
							For: 0,
							Against: 0,
							Abstain: 0,
							['No Vote']: 0,
						};
						for (const key of Object.keys(voteResults)) {
							const count = ballot.votes.filter(
								(_vote: { action: string; id: string }) => _vote.action === key
							).length;
							localResults[key] = count;
						}
						setVoteResults(localResults);
					}
				}
			} else {
				if (ballotStatus === 'In Progress') {
					const voteBody = {
						ballot: ballot?.ballot.id,
						action: VoteOption.NO_VOTE,
					};

					try {
						createVoteMutation.mutateAsync(voteBody);
					} catch (err) {
						console.log(err);
					}
				}
			}
		}
	}, [ballot, ballotStatus]);

	return (
		<>
			<Head>
				<title>
					{!ballotLoading && !ballotFetching
						? ballot?.ballot
							? `${ballot.ballot.title}`
							: 'Error'
						: 'Loading...'}
				</title>
			</Head>
			<AppLayout>
				<Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
					<IconButton onClick={() => router.push('/ballots')}>
						<ArrowBack />
					</IconButton>
					<Typography variant="h3">
						{!ballotLoading && !ballotFetching
							? ballot?.ballot
								? `${ballot.ballot.title}`
								: 'Error'
							: 'Loading...'}
					</Typography>
				</Box>
				<Grid container spacing={3}>
					<Grid item xs={12} lg={8}>
						{!ballotLoading && !ballotFetching ? (
							ballot?.ballot ? (
								<Chip label={ballot.ballot.category} sx={{ mb: 1 }} />
							) : null
						) : (
							<>
								<Skeleton width="10%" />
							</>
						)}
						{!ballotLoading && !ballotFetching ? (
							ballot?.ballot ? (
								<Typography variant="subtitle1">
									{new Date(ballot.ballot.ballotStart).toDateString()} -{' '}
									{new Date(ballot.ballot.ballotEnd).toDateString()} (
									{currentDate < new Date(ballot.ballot.ballotEnd)
										? 'In Progress'
										: 'Voting has Ended'}
									)
								</Typography>
							) : null
						) : (
							<>
								<Skeleton width="30%" />
							</>
						)}
						<Typography variant="body2">
							{!ballotLoading && !ballotFetching ? (
								ballot?.ballot ? (
									ballot.ballot.description
								) : (
									'Could not load ballot description.'
								)
							) : (
								<>
									<Skeleton width="100%" />
									<Skeleton width="100%" />
									<Skeleton width="100%" />
								</>
							)}
						</Typography>
					</Grid>
					<Grid item xs={12} lg={4}>
						<Card
							sx={{
								height: '100%',
								display: 'flex',
								flexDirection: 'column',
								borderRadius: 3,
								boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.4)',
							}}
						>
							<CardHeader
								title={
									!ballotLoading && !ballotFetching ? (
										ballot?.ballot ? (
											`${ballot.ballot.stock.name} - ${ballot.ballot.stock.abbreviation}`
										) : (
											'Could not get Stock Name.'
										)
									) : (
										<>
											<Skeleton width="30%" />
										</>
									)
								}
								subheader={
									!ballotLoading && !ballotFetching ? (
										ballot?.ballot ? (
											`${ballot.ballot.stock.sector}`
										) : (
											'Could not get Stock Sector.'
										)
									) : (
										<>
											<Skeleton width="30%" />
										</>
									)
								}
							/>
							<CardContent
								sx={{
									textAlign: 'center',
									fontWeight: 600,
									fontSize: 24,
									flexGrow: 1,
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								{!ballotLoading && !ballotFetching ? (
									ballot?.ballot ? (
										GBPound.format(ballot.ballot.stock.price)
									) : (
										'Error Loading'
									)
								) : (
									<>
										<Skeleton width="40%" />
									</>
								)}
							</CardContent>
						</Card>
					</Grid>
					<Grid container justifyContent="center" sx={{ mt: 5 }}>
						{ballotStatus ? (
							ballotStatus === 'In Progress' || ballotStatus === 'Finished' ? (
								ballotStatus === 'In Progress' &&
								(!ballot?.votes || ballot?.vote === VoteOption.NO_VOTE) ? (
									<Grid item xs={12} md={6} lg={3}>
										<Typography
											variant="h5"
											sx={{ textAlign: 'center' }}
											gutterBottom
										>
											Vote
										</Typography>
										<VoteForm ballotId={ballot?.ballot.id} />
									</Grid>
								) : (
									<VoteChart
										For={voteResults?.For}
										Against={voteResults?.Against}
										Abstain={voteResults?.Abstain}
										NoVote={voteResults['No Vote']}
									/>
								)
							) : (
								<Grid item>
									<Typography variant="h4" sx={{ mt: 10 }}>
										Voting for this ballot is not yet open.
									</Typography>
								</Grid>
							)
						) : (
							<Grid item>
								<CircularProgress variant="indeterminate" />
							</Grid>
						)}
					</Grid>
				</Grid>
			</AppLayout>
		</>
	);
};

export default Ballot;
