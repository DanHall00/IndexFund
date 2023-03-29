import AppLayout from '@/components/layout/AppLayout';
import Shortcut from '@/components/shared/Shortcut';
import { IFundDoc } from '@/modules/funds/fund.interfaces';
import { getFundById } from '@/modules/funds/fund.service';
import { IStockDoc } from '@/modules/stocks/stock.interfaces';
import { Skeleton, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

const GBPound = new Intl.NumberFormat(undefined, {
	style: 'currency',
	currency: 'GBP',
});

const Fund = () => {
	const router = useRouter();
	const { id } = router.query;

	const {
		data: fund,
		isLoading: fundsLoading,
		isFetching: fundsFetching,
	} = useQuery<IFundDoc>(['funds'], () => getFundById(id));

	return (
		<>
			<Head>
				<title>{fund ? fund.name : 'Loading'}</title>
			</Head>
			<AppLayout>
				<Typography variant="h3">{fund ? fund.name : <Skeleton />}</Typography>
				{/* {!fundsLoading && !fundsFetching ? (
					fund ? (
						fund.assets.length > 0 ? (
							<ShortcutContainer justifyContent="start">
								{fund.assets.map((item: IStockDoc, index: number) => (
									<Shortcut
										key={item.id}
										title={`${item.name} - ${item.abbreviation}`}
										description={
											item.sector !== 'n/a' ? item.sector : 'Sector not found'
										}
										value={GBPound.format(item.price)}
									/>
								))}
							</ShortcutContainer>
						) : (
							<Typography>No Assets Found In Fund</Typography>
						)
					) : (
						<Typography>No Data</Typography>
					)
				) : (
					<Typography>Loading...</Typography>
				)} */}
			</AppLayout>
		</>
	);
};

export default Fund;
