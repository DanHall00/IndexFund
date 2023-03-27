import { Skeleton, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import React from 'react';

export default function NavHeader() {
	const { data: session } = useSession();
	return (
		<>
			<Typography variant="h5" sx={{ fontWeight: 600 }} gutterBottom>
				Account Number
			</Typography>
			{session ? (
				<Typography variant="body1">{session?.user.account_number}</Typography>
			) : (
				<Skeleton variant="text" animation="wave" />
			)}
		</>
	);
}
