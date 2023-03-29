import AppLayout from '@/components/layout/AppLayout';
import Shortcut from '@/components/shared/Shortcut';
import { IFundDoc } from '@/modules/funds/fund.interfaces';
import { getFunds } from '@/modules/funds/fund.service';
import { Skeleton, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

const Funds = () => {
	const {
		data: allFunds,
		isLoading: allFundsLoading,
		isFetching: allFundsFetching,
	} = useQuery(['funds'], getFunds);

	console.log(allFunds);

	return (
		<>
			<Head>
				<title>Overview</title>
			</Head>
			<AppLayout>
				<Typography variant="h3">All Funds</Typography>
				{/* {!allFundsLoading && !allFundsFetching ? (
					allFunds ? (
						<ShortcutContainer justifyContent="start">
							{allFunds.map((item: IFundDoc, index: number) => (
								<Shortcut
									key={item.id}
									title={item.name}
									description={`Total Holdings: ${item.assets.length} assets.`}
									action={() => router.push(`/funds/${item.id}`)}
									actionLabel="View"
								/>
							))}
						</ShortcutContainer>
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

export default Funds;
