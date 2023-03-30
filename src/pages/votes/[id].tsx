import AppLayout from '@/components/layout/AppLayout';
import VoteChart from '@/components/votes/VoteChart';
import { IStockDoc } from '@/modules/stocks/stock.interfaces';
import { IVoteDoc } from '@/modules/votes/vote.interfaces';
import { getVoteById } from '@/modules/votes/vote.service';
import { ArrowBack } from '@mui/icons-material';
import {
	Box,
	Card,
	CardContent,
	CardHeader,
	Chip,
	Grid,
	IconButton,
	Skeleton,
	Typography,
} from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

/*
 * ----------------------------------------------------------------------------------
 * MONEY FORMATTER
 * ----------------------------------------------------------------------------------
 */
const GBPound = new Intl.NumberFormat(undefined, {
	style: 'currency',
	currency: 'GBP',
});

/**
 * Page /votes/[id]
 *
 * @return {*}
 */
const Vote = () => {
	/*
	 * ----------------------------------------------------------------------------------
	 * HOOKS
	 * ----------------------------------------------------------------------------------
	 */
	const router = useRouter();
	const { id } = router.query;

	/*
	 * ----------------------------------------------------------------------------------
	 * LOCAL STATE
	 * ----------------------------------------------------------------------------------
	 */
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

	/*
	 * ----------------------------------------------------------------------------------
	 * REACT QUERY
	 * ----------------------------------------------------------------------------------
	 */
	const {
		data: vote,
		isLoading: voteLoading,
		isFetching: voteFetching,
	} = useQuery<{ vote: IVoteDoc; stock: IStockDoc; results: any[] }>(
		['vote', id],
		() => getVoteById(id),
		{
			refetchOnWindowFocus: false,
			enabled: !!id,
		}
	);

	/*
	 * ----------------------------------------------------------------------------------
	 * EFFECTS
	 * ----------------------------------------------------------------------------------
	 */
	useEffect(() => {
		if (vote) {
			if (Array.isArray(vote.results)) {
				const localResults: any = {
					For: 0,
					Against: 0,
					Abstain: 0,
					['No Vote']: 0,
				};
				for (const key of Object.keys(voteResults)) {
					const count = vote.results.filter(
						(_vote: { action: string; id: string }) => _vote.action === key
					).length;
					localResults[key] = count;
				}
				setVoteResults(localResults);
			}
		}
	}, [vote]);

	/*
	 * ----------------------------------------------------------------------------------
	 * RENDER COMPONENT
	 * ----------------------------------------------------------------------------------
	 */
	return (
		<>
			<Head>
				<title>
					{!voteLoading && !voteFetching
						? vote?.vote
							? `Vote | ${vote.vote.ballot.title}`
							: 'Error'
						: 'Loading...'}
				</title>
			</Head>
			<AppLayout>
				<Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
					<IconButton onClick={() => router.push('/votes')}>
						<ArrowBack />
					</IconButton>
					<Typography variant="h3">
						{!voteLoading && !voteFetching
							? vote?.vote
								? vote.vote.ballot.title
								: 'Error'
							: 'Loading...'}
					</Typography>
				</Box>
				<Grid container spacing={3}>
					<Grid item xs={12} lg={8}>
						{!voteLoading && !voteFetching ? (
							vote?.vote ? (
								<Chip label={vote.vote.ballot.category} sx={{ mb: 1 }} />
							) : null
						) : (
							<>
								<Skeleton width="10%" />
							</>
						)}
						{!voteLoading && !voteFetching ? (
							vote?.vote ? (
								<Typography variant="subtitle1">
									{new Date(vote.vote.ballot.ballotStart).toDateString()} -{' '}
									{new Date(vote.vote.ballot.ballotEnd).toDateString()} (
									{currentDate < new Date(vote.vote.ballot.ballotEnd)
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
							{!voteLoading && !voteFetching ? (
								vote?.vote ? (
									vote.vote.ballot.description
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
									!voteLoading && !voteFetching ? (
										vote?.stock ? (
											`${vote.stock.name} - ${vote.stock.abbreviation}`
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
									!voteLoading && !voteFetching ? (
										vote?.stock ? (
											`${vote.stock.sector}`
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
								{!voteLoading && !voteFetching ? (
									vote?.stock ? (
										GBPound.format(vote.stock.price)
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
					<VoteChart
						For={voteResults?.For}
						Against={voteResults?.Against}
						Abstain={voteResults?.Abstain}
						NoVote={voteResults['No Vote']}
					/>
				</Grid>
			</AppLayout>
		</>
	);
};

export default Vote;
