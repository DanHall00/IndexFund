import AppLayout from '@/components/layout/AppLayout';
import Shortcut from '@/components/shared/Shortcut';
import { IUserFundDoc } from '@/modules/funds/fund.interfaces';
import { getUserFunds } from '@/modules/funds/fund.service';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

/*
 * ----------------------------------------------------------------------------------
 * RENDER COMPONENT
 * ----------------------------------------------------------------------------------
 */
const GBPound = new Intl.NumberFormat(undefined, {
	style: 'currency',
	currency: 'GBP',
});

/**
 * Page for /investments
 *
 * @return {*}
 */
const Investments = () => {
	/*
	 * ----------------------------------------------------------------------------------
	 * HOOKS
	 * ----------------------------------------------------------------------------------
	 */
	const router = useRouter();

	/*
	 * ----------------------------------------------------------------------------------
	 * REACT QUERY
	 * ----------------------------------------------------------------------------------
	 */
	const {
		data: allFunds,
		isLoading: allFundsLoading,
		isFetching: allFundsFetching,
	} = useQuery(['userFunds'], getUserFunds, { refetchOnWindowFocus: false });

	/*
	 * ----------------------------------------------------------------------------------
	 * RENDER COMPONENT
	 * ----------------------------------------------------------------------------------
	 */
	return (
		<>
			<Head>
				<title>Investments</title>
			</Head>
			<AppLayout>
				<Typography variant="h3" gutterBottom>
					Investments
				</Typography>
				{!allFundsLoading && !allFundsFetching ? (
					allFunds && !allFunds.error ? (
						allFunds.length > 0 ? (
							<>
								<Box sx={{ display: 'flex', justifyContent: 'end', mb: 2 }}>
									<Button
										variant="contained"
										onClick={() => router.push('/funds')}
										color="secondary"
									>
										Invest
									</Button>
								</Box>
								<Grid container spacing={3}>
									{allFunds.map((item: IUserFundDoc) => (
										<Shortcut
											key={item.id}
											title={item.fund.name}
											description={`Total Holdings: ${item.fund.assets.length} assets.`}
											value={GBPound.format(item.value)}
											valueProps={{
												color:
													item.value >= item.initialValue
														? item.value === item.initialValue
															? '#FBFBFB'
															: '#2AA728'
														: '#DC6262',
											}}
											action={() => router.push(`/investments/${item.id}`)}
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
									alignItems: 'center',
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
							alignItems: 'center',
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
};

export default Investments;
