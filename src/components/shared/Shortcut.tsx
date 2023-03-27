import { Box, Button, Typography } from '@mui/material';
import React from 'react';

interface IShortcutProps {
	title: string;
	description?: string;
	value?: string | React.ReactNode;
	valueProps?: {};
	action?: () => void;
	actionLabel?: string;
}

export default function Shortcut({
	title,
	description,
	value,
	valueProps,
	action,
	actionLabel = 'View Details',
}: IShortcutProps) {
	return (
		<Box
			sx={{
				width: '200px',
				height: '200px',
				bgcolor: '#F0F0F0',
				boxShadow: '4px 4px 4px rgba(0,0,0,0.25)',
				borderRadius: '10px',
				p: 2,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
			}}
		>
			<Box>
				<Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
					{title}
				</Typography>
				<Typography variant="caption">{description}</Typography>
			</Box>
			<Box
				sx={{
					...valueProps,
					fontWeight: 600,
					fontSize: 24,
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'center',
				}}
			>
				{value}
			</Box>
			<Box>
				{action && (
					<Button
						color="primary"
						variant="contained"
						fullWidth
						onClick={action}
						sx={{ color: 'white', fontWeight: 600 }}
					>
						{actionLabel}
					</Button>
				)}
			</Box>
		</Box>
	);
}
