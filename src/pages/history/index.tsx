import AppLayout from '@/components/layouts/AppLayout';
import { Typography } from '@mui/material';
import Head from 'next/head';

export default function History() {
	return (
		<>
			<Head>
				<title>Voting History</title>
			</Head>
			<AppLayout>
				<Typography variant="h3">Voting History</Typography>
			</AppLayout>
		</>
	);
}
