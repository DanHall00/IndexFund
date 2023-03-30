import BallotTable from '@/components/ballots/BallotTable';
import AppLayout from '@/components/layout/AppLayout';
import Shortcut from '@/components/shared/Shortcut';
import { IBallotDoc } from '@/modules/ballots/ballot.interfaces';
import { IFundDoc, IUserFundDoc } from '@/modules/funds/fund.interfaces';
import { getFundById, getUserFundById } from '@/modules/funds/fund.service';
import { IStockDoc } from '@/modules/stocks/stock.interfaces';
import { ArrowBack } from '@mui/icons-material';
import {
	Box,
	Button,
	CircularProgress,
	Grid,
	IconButton,
	Skeleton,
	Table,
	TableCell,
	TableHead,
	TableRow,
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

const Fund = () => {
	const { data: session } = useSession();
	const router = useRouter();
	const { id } = router.query;

	const {
		data: investment,
		isLoading: investmentLoading,
		isFetching: investmentFetching,
	} = useQuery<{
		userFund: IUserFundDoc;
		fund: IFundDoc;
		ballots: IBallotDoc[];
	}>(['investment', id], () => getUserFundById(id), {
		refetchOnWindowFocus: false,
		enabled: !!id,
	});

	return (
		<>
			<Head>
				<title>
					{!investmentLoading && !investmentFetching
						? investment
							? `Your '${investment.fund.name}' Fund`
							: 'Error'
						: 'Loading...'}
				</title>
			</Head>
			<AppLayout>
				<Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
					<IconButton onClick={() => router.push('/investments')}>
						<ArrowBack />
					</IconButton>
					<Typography variant="h3">
						{!investmentLoading && !investmentFetching
							? investment
								? `Your '${investment.fund.name}' Fund`
								: 'Error'
							: 'Loading...'}
					</Typography>
				</Box>
				<Box sx={{ display: 'flex', justifyContent: 'start', gap: 5, mb: 1 }}>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'start',
							alignItems: 'end',
							gap: 1,
						}}
					>
						<Typography variant="h6">Initial Investment</Typography>
						<Typography variant="subtitle1">
							{!investmentLoading && !investmentFetching ? (
								investment ? (
									`${GBPound.format(investment.userFund.initialValue)}`
								) : (
									'Error'
								)
							) : (
								<Skeleton width="90px" />
							)}
						</Typography>
					</Box>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'start',
							alignItems: 'end',
							gap: 1,
						}}
					>
						<Typography variant="h6">Current Value</Typography>
						<Typography variant="subtitle1">
							{!investmentLoading && !investmentFetching ? (
								investment ? (
									`${GBPound.format(investment.userFund.value)}`
								) : (
									'Error'
								)
							) : (
								<Skeleton width="90px" />
							)}
						</Typography>
					</Box>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'start',
							alignItems: 'end',
							gap: 1,
						}}
					>
						<Typography variant="h6">Rate of Return</Typography>
						<Typography variant="subtitle1">
							{!investmentLoading && !investmentFetching ? (
								investment ? (
									`${
										Math.round(
											(((investment.userFund.value -
												investment.userFund.initialValue) /
												investment.userFund.initialValue) *
												100 +
												Number.EPSILON) *
												100
										) / 100
									}%`
								) : (
									'Error'
								)
							) : (
								<Skeleton width="90px" />
							)}
						</Typography>
					</Box>
				</Box>
				<Typography variant="h4" gutterBottom>
					Ballots
				</Typography>
				{!investmentLoading && !investmentFetching ? (
					investment ? (
						investment.ballots.length > 0 ? (
							<BallotTable ballots={investment.ballots} />
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
										mb: 5,
									}}
								>
									<Typography variant="subtitle1">
										There are no current or upcoming ballots within this fund.
										Available ballots will appear here.
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
									An error occured while retrieving ballots, please try again
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
						<Typography variant="subtitle1">Loading Ballots</Typography>
					</Box>
				)}
				<Typography variant="h4" gutterBottom>
					Your{' '}
					{investment?.fund?.assets?.length && investment?.fund?.assets?.length}{' '}
					Assets
				</Typography>
				{!investmentLoading && !investmentFetching ? (
					investment ? (
						investment.fund.assets.length > 0 ? (
							<Grid container spacing={3}>
								{investment.fund.assets.map((item: IStockDoc) => (
									<Shortcut
										key={item.id}
										title={`${item.name} - ${item.abbreviation}`}
										description={
											item.sector !== 'n/a' ? item.sector : 'Sector not found'
										}
										value={GBPound.format(item.price)}
									/>
								))}
							</Grid>
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
										Sorry! It looks like this fund has no assets at this time.
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
							<Typography variant="subtitle1">
								An error occured while retrieving your funds, please try again
								later.
							</Typography>
						</Box>
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

export default Fund;
