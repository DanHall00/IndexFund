import InvestModal from '@/components/funds/InvestModal';
import AppLayout from '@/components/layout/AppLayout';
import Shortcut from '@/components/shared/Shortcut';
import { IFundDoc, IUserFundDoc } from '@/modules/funds/fund.interfaces';
import { getFundById } from '@/modules/funds/fund.service';
import { IStockDoc } from '@/modules/stocks/stock.interfaces';
import { ArrowBack } from '@mui/icons-material';
import {
	Box,
	Button,
	CircularProgress,
	Grid,
	IconButton,
	Typography,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useRef } from 'react';
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
 * Page for /fund/[id]
 *
 * @return {*}
 */
const Fund = () => {
	/*
	 * ----------------------------------------------------------------------------------
	 * HOOKS
	 * ----------------------------------------------------------------------------------
	 */
	const { data: session } = useSession();
	const router = useRouter();
	const { id } = router.query;

	/*
	 * ----------------------------------------------------------------------------------
	 * MODAL REFS
	 * ----------------------------------------------------------------------------------
	 */
	type InvestModalHandle = React.ElementRef<typeof InvestModal>;
	const investModalRef = useRef<InvestModalHandle>(null);

	/*
	 * ----------------------------------------------------------------------------------
	 * REACT QUERY
	 * ----------------------------------------------------------------------------------
	 */
	const {
		data: fund,
		isLoading: fundLoading,
		isFetching: fundFetching,
	} = useQuery<{ fund: IFundDoc; userFund: IUserFundDoc }>(
		['funds', id],
		() => getFundById(id),
		{
			refetchOnWindowFocus: false,
			enabled: !!id,
		}
	);

	/*
	 * ----------------------------------------------------------------------------------
	 * RENDER COMPONENT
	 * ----------------------------------------------------------------------------------
	 */
	return (
		<>
			<Head>
				<title>
					{!fundLoading && !fundFetching
						? fund?.fund
							? `${fund.fund.name}`
							: 'Error'
						: 'Loading...'}
				</title>
			</Head>
			<AppLayout>
				<Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
					<IconButton onClick={() => router.push('/funds')}>
						<ArrowBack />
					</IconButton>
					<Typography variant="h3">
						{!fundLoading && !fundFetching
							? fund?.fund
								? `${fund.fund.name}`
								: 'Error'
							: 'Loading...'}
					</Typography>
				</Box>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						mb: 2,
					}}
				>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'start',
							alignItems: 'center',
						}}
					>
						{fund && !fund.userFund && (
							<Button
								color="secondary"
								variant="contained"
								onClick={() => {
									if (fund?.fund !== undefined)
										investModalRef.current?.handleOpenModal(fund?.fund);
								}}
							>
								Invest
							</Button>
						)}
					</Box>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'start',
							alignItems: 'center',
						}}
					>
						{session?.user.role === 'admin' && (
							<>
								<Button variant="contained">Add Asset</Button>
							</>
						)}
					</Box>
				</Box>
				{!fundLoading && !fundFetching ? (
					fund?.fund ? (
						fund.fund.assets.length > 0 ? (
							<Grid container spacing={3}>
								{fund.fund.assets.map((item: IStockDoc) => (
									<Shortcut
										key={item.id}
										title={`${item.name} - ${item.abbreviation}`}
										description={
											item.sector !== 'n/a' ? item.sector : 'Sector not found'
										}
										value={GBPound.format(item.price)}
										action={
											session?.user.role === 'admin'
												? () => {
														console.log('Remove Asset');
												  }
												: undefined
										}
										actionLabel="Remove From Fund"
										actionColor="error"
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
				<InvestModal ref={investModalRef} />
			</AppLayout>
		</>
	);
};

export default Fund;
