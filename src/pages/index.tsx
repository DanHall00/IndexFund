import AppLayout from '@/components/layout/AppLayout';
import Shortcut from '@/components/shared/Shortcut';
import { getAvailableBallots } from '@/modules/ballots/ballot.service';
import { IUserFundDoc } from '@/modules/funds/fund.interfaces';
import { getUserFunds } from '@/modules/funds/fund.service';
import { getCurrentUser } from '@/modules/users/user.service';
import { getVotingHistory } from '@/modules/votes/vote.service';
import { Grid, Skeleton, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
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
 * Page for /
 *
 * @return {*}
 */
const Overview = () => {
	/*
	 * ----------------------------------------------------------------------------------
	 * HOOKS
	 * ----------------------------------------------------------------------------------
	 */
	const router = useRouter();
	const { data: session } = useSession();

	/*
	 * ----------------------------------------------------------------------------------
	 * LOCAL STATE
	 * ----------------------------------------------------------------------------------
	 */
	const [investmentsValue, setInvestmentsValue] = useState<
		number | null | undefined
	>(undefined);
	const [investmentsInitialValue, setInvestmentsInitialValue] = useState<
		number | null | undefined
	>(undefined);
	const [investmentsTotalAssets, setInvestmentsTotalAssets] = useState<
		number | null | undefined
	>(undefined);

	/*
	 * ----------------------------------------------------------------------------------
	 * REACT QUERY
	 * ----------------------------------------------------------------------------------
	 */
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

	const { data: availableBallots } = useQuery(
		['availableBallots'],
		getAvailableBallots,
		{
			refetchOnWindowFocus: false,
		}
	);

	/*
	 * ----------------------------------------------------------------------------------
	 * EFFECTS
	 * ----------------------------------------------------------------------------------
	 */
	useEffect(() => {
		// Check if funds
		if (allFunds) {
			// Check that the funds are an array
			if (Array.isArray(allFunds) && allFunds.length > 0) {
				// Calculate total value of fund
				let valueSum: number = allFunds
					.map((a: IUserFundDoc) => a.value)
					.reduce(function (a: number, b: number) {
						return a + b;
					});

				// Calculate total initial value
				let initialValueSum: number = allFunds
					.map((a: IUserFundDoc) => a.initialValue)
					.reduce(function (a: number, b: number) {
						return a + b;
					});

				// Calculate count of assets
				let totalAssets: number = allFunds
					.map((a: IUserFundDoc) => a.fund.assets.length)
					.reduce(function (a: number, b: number) {
						return a + b;
					});

				setInvestmentsValue(valueSum);
				setInvestmentsInitialValue(initialValueSum);
				setInvestmentsTotalAssets(totalAssets);
			} else {
				setInvestmentsValue(null);
				setInvestmentsInitialValue(null);
				setInvestmentsTotalAssets(null);
			}
		}
	}, [allFunds]);

	/*
	 * ----------------------------------------------------------------------------------
	 * RENDER COMPONENT
	 * ----------------------------------------------------------------------------------
	 */
	return (
		<>
			<Head>
				<title>Overview</title>
			</Head>
			<AppLayout>
				<Typography variant="h3">Overview</Typography>
				<Grid container sx={{ mt: 3 }} spacing={3} justifyContent="center">
					<Shortcut
						title="Investments"
						description={
							investmentsTotalAssets !== undefined
								? investmentsTotalAssets
									? `Total Holdings: ${investmentsTotalAssets} Assets`
									: 'No Assets'
								: 'Loading Assets'
						}
						value={
							investmentsValue !== undefined ? (
								investmentsValue ? (
									GBPound.format(Number(investmentsValue))
								) : (
									'No Investments'
								)
							) : (
								<Skeleton width="100%" />
							)
						}
						valueProps={{
							color: investmentsValue
								? Number(investmentsValue) >= Number(investmentsInitialValue)
									? Number(investmentsValue) === Number(investmentsInitialValue)
										? '#FBFBFB'
										: '#2AA728'
									: '#DC6262'
								: '#FBFBFB',
						}}
						action={() => router.push('/investments')}
					/>
					<Shortcut
						title="Available Ballots"
						value={
							availableBallots ? (
								availableBallots.length
							) : (
								<Skeleton width="80%" />
							)
						}
						action={() => router.push('/ballots')}
					/>
					<Shortcut
						title="Your Past Votes"
						value={voteHistory ? voteHistory.length : <Skeleton width="80%" />}
						action={() => router.push('/votes')}
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
					<Shortcut
						title="Total Value"
						value={
							userData && investmentsValue !== undefined ? (
								userData.balance && investmentsValue ? (
									GBPound.format(Number(userData.balance + investmentsValue))
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
