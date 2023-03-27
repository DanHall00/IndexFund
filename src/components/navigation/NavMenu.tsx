import { List, ListItem } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import NavButton from './NavButton';

export default function NavMenu() {
	const router = useRouter();
	return (
		<>
			<List>
				<ListItem disablePadding>
					<NavButton page="" label="Overview" />
				</ListItem>
				<ListItem disablePadding>
					<NavButton page="investments" label="Investments" />
				</ListItem>
				<ListItem disablePadding>
					<NavButton page="history" label="Voting History" />
				</ListItem>
			</List>
		</>
	);
}
