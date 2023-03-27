import { Box } from '@mui/material';
import React from 'react';

interface IShortcutContainerProps {
	children: React.ReactNode;
}

export default function ShortcutContainer({
	children,
}: IShortcutContainerProps) {
	return (
		<Box
			sx={{
				display: 'flex',
				gap: 3,
				justifyContent: 'space-around',
				flexWrap: 'wrap',
				mt: 3,
			}}
		>
			{children}
		</Box>
	);
}
