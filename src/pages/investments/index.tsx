import AppLayout from '@/components/layouts/AppLayout';
import { Typography } from '@mui/material';
import Head from 'next/head';

export default function Investments() {
	return (
		<>
			<Head>
				<title>Investments</title>
			</Head>
			<AppLayout>
				<Typography variant="h3">Investments</Typography>
			</AppLayout>
		</>
	);
}
