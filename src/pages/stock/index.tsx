import AppLayout from '@/components/layout/AppLayout';
import Shortcut from '@/components/shared/Shortcut';
import { IStockDoc } from '@/modules/stocks/stock.interfaces';
import { getAllStocks } from '@/modules/stocks/stock.service';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
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
 * Page for /stocks
 *
 * @return {*}
 */
const Stocks = () => {
	/*
	 * ----------------------------------------------------------------------------------
	 * HOOKS
	 * ----------------------------------------------------------------------------------
	 */
	const { data: session } = useSession();

	/*
	 * ----------------------------------------------------------------------------------
	 * REACT QUERY
	 * ----------------------------------------------------------------------------------
	 */
	const {
		data: allStocks,
		isLoading: allStocksLoading,
		isFetching: allStocksFetching,
	} = useQuery(['stocks'], getAllStocks, { refetchOnWindowFocus: false });

	/*
	 * ----------------------------------------------------------------------------------
	 * ADMIN ONLT PAGE PROTECTION
	 * ----------------------------------------------------------------------------------
	 */
	if (session?.user.role !== 'admin') {
		return (
			<>
				<Head>
					<title>Error</title>
				</Head>
				<AppLayout>
					<Typography variant="h2">403 Forbidden</Typography>
					<Typography variant="subtitle1">
						You do not have permission to view this page
					</Typography>
				</AppLayout>
			</>
		);
	}

	/*
	 * ----------------------------------------------------------------------------------
	 * RENDER COMPONENT
	 * ----------------------------------------------------------------------------------
	 */
	return (
		<>
			<Head>
				<title>Stocks</title>
			</Head>
			<AppLayout>
				<Typography variant="h3" gutterBottom>
					Stocks
				</Typography>
				<Box sx={{ display: 'flex', justifyContent: 'end', mb: 2 }}>
					<Button variant="contained" onClick={() => {}} color="secondary">
						Create Stock
					</Button>
				</Box>
				{!allStocksLoading && !allStocksFetching ? (
					allStocks ? (
						allStocks.length > 0 ? (
							<>
								<Grid container spacing={3}>
									{allStocks.map((item: IStockDoc) => (
										<Shortcut
											key={item.id}
											title={`${item.name} - ${item.abbreviation}`}
											description={`${item.sector}`}
											value={GBPound.format(item.price)}
											action={
												session?.user.role === 'admin'
													? () => {
															console.log('Delete Stock');
													  }
													: undefined
											}
											actionColor="error"
											actionLabel="Delete Stock"
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
										Looks like there are currently no stocks available.
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
									An error occured while retrieving stocks, please try again
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
						<Typography variant="subtitle1">Loading Stocks</Typography>
					</Box>
				)}
			</AppLayout>
		</>
	);
};

export default Stocks;
