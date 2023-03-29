import AppLayout from '@/components/layout/AppLayout';
import Shortcut from '@/components/shared/Shortcut';
import { IUserFundDoc } from '@/modules/funds/fund.interfaces';
import { getUserFunds } from '@/modules/funds/fund.service';
import { getCurrentUser } from '@/modules/users/user.service';
import { getVotingHistory } from '@/modules/votes/vote.service';
import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Grid,
	Skeleton,
	Typography,
} from '@mui/material';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { QueryClient, dehydrate, useQuery } from 'react-query';
import { authOptions } from './api/auth/[...nextauth]';

const GBPound = new Intl.NumberFormat(undefined, {
	style: 'currency',
	currency: 'GBP',
});

const Overview = () => {
	const router = useRouter();
	const { data: session } = useSession();

	const [investmentsValue, setInvestmentsValue] = useState<number | null>(null);
	const [investmentsInitialValue, setInvestmentsInitialValue] = useState<
		number | null
	>(null);
	const [investmentsTotalAssets, setInvestmentsTotalAssets] = useState<
		number | null
	>(null);

	const { data: userData } = useQuery(['currentUser'], getCurrentUser, {
		enabled: !!session,
		refetchOnWindowFocus: false,
	});

	const { data: allFunds } = useQuery(['userFunds'], getUserFunds, {
		refetchOnWindowFocus: false,
	});

	const { data: voteHistory } = useQuery(['voteHistory'], getVotingHistory, {
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		if (allFunds) {
			let valueSum: number = allFunds
				.map((a: IUserFundDoc) => a.value)
				.reduce(function (a: number, b: number) {
					return a + b;
				});

			let initialValueSum: number = allFunds
				.map((a: IUserFundDoc) => a.initialValue)
				.reduce(function (a: number, b: number) {
					return a + b;
				});

			let totalAssets: number = allFunds
				.map((a: IUserFundDoc) => a.fund.assets.length)
				.reduce(function (a: number, b: number) {
					return a + b;
				});

			setInvestmentsValue(valueSum);
			setInvestmentsInitialValue(initialValueSum);
			setInvestmentsTotalAssets(totalAssets);
		}
	}, [allFunds]);

	return (
		<>
			<Head>
				<title>Overview</title>
			</Head>
			<AppLayout>
				<Typography variant="h3">Overview</Typography>
				<Grid container sx={{ mt: 3 }} spacing={3}>
					<Shortcut
						title="Investments"
						description={`Total Holdings: ${investmentsTotalAssets} Assets`}
						value={
							investmentsValue ? (
								GBPound.format(Number(investmentsValue))
							) : (
								<Skeleton width="100%" />
							)
						}
						valueProps={{
							color:
								Number(investmentsValue) >= Number(investmentsInitialValue)
									? Number(investmentsValue) === Number(investmentsInitialValue)
										? '#FBFBFB'
										: '#2AA728'
									: '#DC6262',
						}}
						action={() => router.push('/investments')}
					/>
					<Shortcut
						title="Available Votes"
						value="12"
						action={() => router.push('/investments')}
					/>
					<Shortcut
						title="Your Past Votes"
						value={voteHistory ? voteHistory.length : <Skeleton width="100%" />}
						action={() => router.push('/history')}
					/>
					<Shortcut
						title="Available Cash"
						value={
							userData ? (
								userData.balance ? (
									GBPound.format(Number(userData.balance))
								) : (
									'Could not load.'
								)
							) : (
								<Skeleton width="100%" />
							)
						}
					/>
				</Grid>
			</AppLayout>
		</>
	);
};

export default Overview;
