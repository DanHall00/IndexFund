import { IVoteDoc } from '@/modules/votes/vote.interfaces';
import { createVote } from '@/modules/votes/vote.service';
import {
	Box,
	Button,
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
	Table,
	TableCell,
	TableHead,
	TableRow,
} from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

interface IVoteFormProps {
	ballotId: string;
}

const VoteForm = ({ ballotId }: IVoteFormProps) => {
	const [vote, setVote] = useState('Abstain');
	const queryClient = useQueryClient();

	const createVoteMutation = useMutation({
		mutationFn: createVote,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['voteHistory'] });
			queryClient.invalidateQueries({ queryKey: ['ballot', ballotId] });
		},
	});

	const submitForm = async (e: React.FormEvent<HTMLDivElement>) => {
		e.preventDefault();

		const voteBody = { ballot: ballotId, action: vote };

		try {
			const response = await createVoteMutation.mutateAsync(voteBody);

			console.log(response);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Box
			component="form"
			justifyContent="start"
			sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
			onSubmit={submitForm}
		>
			<FormControl>
				<RadioGroup
					value={vote}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setVote((e.target as HTMLInputElement).value);
					}}
				>
					<FormControlLabel value="For" control={<Radio />} label="For" />
					<FormControlLabel
						value="Against"
						control={<Radio />}
						label="Against"
					/>
					<FormControlLabel
						value="Abstain"
						control={<Radio />}
						label="Abstain"
					/>
				</RadioGroup>
			</FormControl>
			<Button variant="contained" color="secondary" type="submit" fullWidth>
				Submit Vote
			</Button>
		</Box>
	);
};

export default VoteForm;
