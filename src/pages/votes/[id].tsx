import AppLayout from '@/components/layout/AppLayout';
import Shortcut from '@/components/shared/Shortcut';
import { IFundDoc } from '@/modules/funds/fund.interfaces';
import { getFundById } from '@/modules/funds/fund.service';
import { IStockDoc } from '@/modules/stocks/stock.interfaces';
import { IVoteDoc } from '@/modules/votes/vote.interfaces';
import { getVoteById } from '@/modules/votes/vote.service';
import { ArrowBack } from '@mui/icons-material';
import {
	Box,
	Card,
	CardContent,
	CardHeader,
	Grid,
	IconButton,
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
import { useQuery } from 'react-query';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const GBPound = new Intl.NumberFormat(undefined, {
	style: 'currency',
	currency: 'GBP',
});

const Vote = () => {
	const router = useRouter();
	const { id } = router.query;

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

	useEffect(() => {
		if (vote) {
			if (Array.isArray(vote.results)) {
				for (const key of Object.keys(voteResults)) {
					const count = vote.results.filter(
						(_vote: { action: string; id: string }) => _vote.action === key
					).length;
					setVoteResults({ ...voteResults, [key]: count });
				}
			}
		}
	}, [vote]);

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
				<Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 3 }}>
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
						<Typography variant="body1">
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
					<Grid container justifyContent="center" sx={{ mt: 3 }}>
						<Grid item xs={6}>
							<Bar
								options={{
									responsive: true,
									plugins: {
										title: {
											display: true,
											text: 'Vote Results',
											font: {
												size: 20,
												family: "'Cabin', sans-serif",
											},
										},
										legend: {
											display: false,
										},
									},
								}}
								data={{
									labels: ['For', 'Against', 'Abstain', 'No Vote'],
									datasets: [
										{
											data: [
												voteResults?.For,
												voteResults?.Against,
												voteResults?.Abstain,
												voteResults['No Vote'],
											],
											backgroundColor: '#af4c2a',
										},
									],
								}}
							/>
						</Grid>
					</Grid>
				</Grid>
			</AppLayout>
		</>
	);
};

export default Vote;
