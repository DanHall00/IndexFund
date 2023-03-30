import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Grid,
} from '@mui/material';
import React from 'react';

/**
 * Interface to define props for Shortcut
 *
 * @interface IShortcutProps
 */
interface IShortcutProps {
	title: string;
	description?: string;
	value?: string | React.ReactNode;
	valueProps?: {};
	action?: () => void;
	actionLabel?: string;
	actionColor?: any;
}

/**
 * Component to show data within an MUI card across the application
 *
 * @param {IShortcutProps} {
 * 	title,
 * 	description,
 * 	value,
 * 	valueProps,
 * 	action,
 * 	actionLabel = 'View Details',
 * 	actionColor = 'secondary',
 * }
 * @return {*}
 */
const Shortcut = ({
	title,
	description,
	value,
	valueProps,
	action,
	actionLabel = 'View Details',
	actionColor = 'secondary',
}: IShortcutProps) => {
	/*
	 * ----------------------------------------------------------------------------------
	 * RENDER COMPONENT
	 * ----------------------------------------------------------------------------------
	 */
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
};

export default Shortcut;
