import AppLayout from '@/components/layout/AppLayout';
import Shortcut from '@/components/shared/Shortcut';
import { IFundDoc } from '@/modules/funds/fund.interfaces';
import { getFunds } from '@/modules/funds/fund.service';
import {
	Box,
	Button,
	CircularProgress,
	Grid,
	Skeleton,
	Typography,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

const GBPound = new Intl.NumberFormat(undefined, {
	style: 'currency',
	currency: 'GBP',
});

const Funds = () => {
	const { data: session } = useSession();
	const router = useRouter();
	const {
		data: allFunds,
		isLoading: allFundsLoading,
		isFetching: allFundsFetching,
	} = useQuery(['funds'], getFunds, { refetchOnWindowFocus: false });

	return (
		<>
			<Head>
				<title>Funds</title>
			</Head>
			<AppLayout>
				<Typography variant="h3" gutterBottom>
					All Funds
				</Typography>
				{session?.user.role === 'admin' && (
					<Box sx={{ display: 'flex', justifyContent: 'end', mb: 2 }}>
						<Button variant="contained">Create Fund</Button>
					</Box>
				)}
				{!allFundsLoading && !allFundsFetching ? (
					allFunds && !allFunds.error ? (
						allFunds.length > 0 ? (
							<>
								<Grid container spacing={3}>
									{allFunds.map((item: IFundDoc) => (
										<Shortcut
											key={item.id}
											title={item.name}
											description={`Total Holdings: ${item.assets.length} Assets.`}
											action={() => router.push(`/funds/${item.id}`)}
											actionLabel="View Fund"
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
										Sorry! It looks like there are no funds available at this
										time.
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

export default Funds;
