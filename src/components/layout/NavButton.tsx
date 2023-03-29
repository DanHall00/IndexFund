import {
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Popover,
	Typography,
	useTheme,
} from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export interface INavButton {
	path: string;
	label: string;
	icon: any;
	drawerOpen: boolean;
}

export default function NavButton({
	path,
	label,
	icon: Icon,
	drawerOpen,
}: INavButton) {
	const theme = useTheme();
	const { pathname, push } = useRouter();

	const activePath = pathname.split('/')[1].split('/')[0];

	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const open = Boolean(anchorEl);

	const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handlePopoverClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<ListItem disablePadding sx={{ display: 'block' }}>
				<ListItemButton
					sx={{
						minHeight: 48,
						justifyContent: drawerOpen ? 'initial' : 'center',
						px: 2.5,
						color:
							activePath.toLowerCase() === path ? 'primary.main' : 'inherit',
						bgcolor:
							activePath.toLowerCase() === path
								? 'background.default'
								: 'inherit',
						cursor: activePath.toLowerCase() === path ? 'default' : 'pointer',
						'&:hover': {
							bgcolor:
								activePath.toLowerCase() === path
									? 'background.default'
									: 'action.hover',
						},
					}}
					onClick={() => {
						if (path !== undefined) push(`/${path}`);
					}}
					onMouseEnter={handlePopoverOpen}
					onMouseLeave={handlePopoverClose}
					aria-owns={open ? 'mouse-over-popover' : undefined}
					aria-haspopup="true"
				>
					<ListItemIcon
						sx={{
							minWidth: 0,
							mr: drawerOpen ? 3 : 'auto',
							justifyContent: 'center',
						}}
					>
						<Icon
							sx={{
								color:
									activePath.toLowerCase() === path
										? 'primary.main'
										: 'inherit',
							}}
						/>
					</ListItemIcon>
					<ListItemText
						primary={label}
						sx={{ opacity: drawerOpen ? 1 : 0 }}
						primaryTypographyProps={{
							fontWeight:
								activePath.toLowerCase() === path ? 'bold' : 'default',
						}}
					/>
				</ListItemButton>
			</ListItem>
			{!drawerOpen && (
				<Popover
					id="mouse-over-popover"
					sx={{
						pointerEvents: 'none',
						ml: 1,
					}}
					open={open}
					anchorEl={anchorEl}
					anchorOrigin={{
						vertical: 'center',
						horizontal: 'right',
					}}
					transformOrigin={{
						vertical: 'center',
						horizontal: 'left',
					}}
					onClose={handlePopoverClose}
					disableRestoreFocus
				>
					<Typography sx={{ p: 1 }}>{label}</Typography>
				</Popover>
			)}
		</>
	);
}
