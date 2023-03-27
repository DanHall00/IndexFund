import { Box } from '@mui/material';
import React from 'react';

interface IShortcutContainerProps {
	children: React.ReactNode;
	justifyContent?: string;
}

export default function ShortcutContainer({
	children,
	justifyContent = 'space-around',
}: IShortcutContainerProps) {
	return (
		<Box
			sx={{
				display: 'flex',
				gap: 3,
				justifyContent: justifyContent,
				flexWrap: 'wrap',
				mt: 3,
			}}
		>
			{children}
		</Box>
	);
}
