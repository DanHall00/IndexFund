import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Grid,
	Typography,
} from '@mui/material';
import React from 'react';

interface IShortcutProps {
	title: string;
	description?: string;
	value?: string | React.ReactNode;
	valueProps?: {};
	action?: () => void;
	actionLabel?: string;
	actionColor?: any;
}

export default function Shortcut({
	title,
	description,
	value,
	valueProps,
	action,
	actionLabel = 'View Details',
	actionColor = 'secondary',
}: IShortcutProps) {
	return (
		<Grid item xs={12} md={6} lg={3}>
			<Card
				sx={{
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					borderRadius: 3,
					boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.4)',
				}}
			>
				<CardHeader title={title} subheader={description} />
				{(value === 0 || value) && (
					<CardContent
						sx={{
							...valueProps,
							textAlign: 'center',
							fontWeight: 600,
							fontSize: 24,
							flexGrow: 1,
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						{value}
					</CardContent>
				)}
				{action && (
					<CardActions>
						<Button
							variant="contained"
							fullWidth
							color={actionColor}
							onClick={action}
						>
							{actionLabel}
						</Button>
					</CardActions>
				)}
			</Card>
		</Grid>
	);
}
