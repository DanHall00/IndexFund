import AppLayout from '@/components/layouts/AppLayout';
import { Box, Button, Typography } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Investments() {
	const router = useRouter();
	return (
		<>
			<Head>
				<title>Investments</title>
			</Head>
			<AppLayout>
				<Typography variant="h3" gutterBottom>
					Investments
				</Typography>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						flexDirection: 'column',
						textAlign: 'center',
						gap: 2,
					}}
				>
					<Typography variant="h5">
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
			</AppLayout>
		</>
	);
}
