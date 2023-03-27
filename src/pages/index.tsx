import AppLayout from '@/components/layouts/AppLayout';
import Shortcut from '@/components/shared/Shortcut';
import ShortcutContainer from '@/components/shared/ShortcutContainer';
import { getUserById } from '@/modules/users/user.service';
import { Skeleton, Typography } from '@mui/material';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { QueryClient, dehydrate, useQuery } from 'react-query';
import { authOptions } from './api/auth/[...nextauth]';

const GBPound = new Intl.NumberFormat(undefined, {
	style: 'currency',
	currency: 'GBP',
});

const Overview = () => {
	const router = useRouter();
	const { data: session } = useSession();

	const { data: userData } = useQuery(
		['user', session?.user.id],
		() => getUserById(session?.user.id),
		{ enabled: !!session }
	);

	return (
		<>
			<Head>
				<title>Overview</title>
			</Head>
			<AppLayout>
				<Typography variant="h3">Overview</Typography>
				<ShortcutContainer>
					<Shortcut
						title="Investments"
						description={`Total Assets: ${220} Holdings`}
						value="£10,000"
						valueProps={{ color: '#2AA728' }}
						action={() => router.push('/investments')}
					/>
					<Shortcut
						title="Available Votes"
						value="13"
						action={() => router.push('/investments')}
					/>
					<Shortcut
						title="Your Past Votes"
						value="28"
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
				</ShortcutContainer>
			</AppLayout>
		</>
	);
};

export default Overview;
