import { IBallotDoc } from '@/modules/ballots/ballot.interfaces';
import { Button, Table, TableCell, TableHead, TableRow } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

/**
 * Interface that defines the props for BallotTable
 *
 * @interface IBallotTableProps
 */
interface IBallotTableProps {
	ballots: IBallotDoc[];
	hideVoteButton?: boolean;
}

/**
 * Component to render given ballots into a table
 *
 * @param {IBallotTableProps} {
 * 	ballots,
 * 	hideVoteButton = false,
 * }
 * @return {*} BallotTable Component
 */
const BallotTable = ({
	ballots,
	hideVoteButton = false,
}: IBallotTableProps): any => {
	/*
	 * ----------------------------------------------------------------------------------
	 * HOOKS
	 * ----------------------------------------------------------------------------------
	 */
	const router = useRouter();

	/*
	 * ----------------------------------------------------------------------------------
	 * RENDER COMPONENT
	 * ----------------------------------------------------------------------------------
	 */

	return (
		<Table sx={{ mb: 2 }}>
			<TableHead>
				<TableRow>
					<TableCell>Title</TableCell>
					<TableCell>Stock</TableCell>
					<TableCell>Category</TableCell>
					<TableCell>Status</TableCell>
					<TableCell>Start Date</TableCell>
					<TableCell>End Date</TableCell>
					<TableCell></TableCell>
				</TableRow>
			</TableHead>
			{ballots.map((item: IBallotDoc) => {
				const currentDate = new Date();
				return (
					<TableRow
						key={item.id}
						sx={{
							'&:last-child td, &:last-child th': { border: 0 },
						}}
					>
						<TableCell>{item.title}</TableCell>
						<TableCell>{item.stock.name}</TableCell>
						<TableCell>{item.category}</TableCell>
						<TableCell
							sx={{
								color:
									new Date(item.ballotStart) < currentDate
										? new Date(item.ballotEnd) > currentDate
											? '#2AA728'
											: '#DC6262'
										: '#E78F5D',
							}}
						>
							{new Date(item.ballotStart) < currentDate
								? new Date(item.ballotEnd) > currentDate
									? 'In Progress'
									: 'Finished'
								: 'Not Yet Started'}
						</TableCell>
						<TableCell>{new Date(item.ballotStart).toDateString()}</TableCell>
						<TableCell>{new Date(item.ballotEnd).toDateString()}</TableCell>
						<TableCell align="right">
							<Button
								color="secondary"
								variant="contained"
								onClick={() => router.push(`/ballots/${item.id}`)}
							>
								{!hideVoteButton ? 'Vote' : 'View'}
							</Button>
						</TableCell>
					</TableRow>
				);
			})}
		</Table>
	);
};

export default BallotTable;
