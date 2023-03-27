import { ListItemButton, ListItemText } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

interface INavButton {
	page: string;
	label: string;
}

export default function NavButton({ page, label }: INavButton) {
	const router = useRouter();
	return (
		<ListItemButton
			onClick={() => {
				if (router.pathname !== `/${page}`) router.push(`/${page}`);
			}}
		>
			<ListItemText
				primary={label}
				primaryTypographyProps={{
					fontWeight: router.pathname === `/${page}` ? 600 : 400,
				}}
			/>
		</ListItemButton>
	);
}
