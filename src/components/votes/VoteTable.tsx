import { IVoteDoc } from '@/modules/votes/vote.interfaces';
import { Button, Table, TableCell, TableHead, TableRow } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

interface IVoteDocTimestamps extends IVoteDoc {
	createdAt: string;
}

interface IVoteTableProps {
	votes: IVoteDocTimestamps[];
}

const VoteTable = ({ votes }: IVoteTableProps) => {
	const router = useRouter();
	return (
		<Table sx={{ mb: 2 }}>
			<TableHead>
				<TableRow>
					<TableCell>Vote Date</TableCell>
					<TableCell>Ballot Title</TableCell>
					<TableCell>Ballot Category</TableCell>
					<TableCell>Ballot Status</TableCell>
					<TableCell>Action</TableCell>
					<TableCell align="right"></TableCell>
				</TableRow>
			</TableHead>
			{votes.map((item: IVoteDocTimestamps) => {
				const currentDate = new Date();
				return (
					<TableRow
						key={item.id}
						sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
					>
						<TableCell>
							{new Date(item.createdAt).toLocaleDateString()}
						</TableCell>
						<TableCell>{item.ballot.title}</TableCell>
						<TableCell>{item.ballot.category}</TableCell>
						<TableCell
							sx={{
								color:
									new Date(item.ballot.ballotEnd) < currentDate
										? '#DC6262'
										: '#2AA728',
							}}
						>
							{new Date(item.ballot.ballotEnd) < currentDate
								? 'Finished'
								: 'In Progress'}
						</TableCell>
						<TableCell>{item.action}</TableCell>
						<TableCell align="right">
							<Button
								variant="contained"
								color="secondary"
								onClick={() => router.push(`/votes/${item.id}`)}
							>
								View
							</Button>
						</TableCell>
					</TableRow>
				);
			})}
		</Table>
	);
};

export default VoteTable;
