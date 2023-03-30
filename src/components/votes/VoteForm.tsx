import { createVote } from '@/modules/votes/vote.service';
import {
	Box,
	Button,
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
} from '@mui/material';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

/**
 * Interface to define props for VoteForm
 *
 * @interface IVoteFormProps
 */
interface IVoteFormProps {
	ballotId: string;
}

/**
 * Component for providing a user the ability to vote on a ballot
 *
 * @param {IVoteFormProps} { ballotId }
 * @return {*}
 */
const VoteForm = ({ ballotId }: IVoteFormProps) => {
	/*
	 * ----------------------------------------------------------------------------------
	 * HOOKS
	 * ----------------------------------------------------------------------------------
	 */
	const queryClient = useQueryClient();

	/*
	 * ----------------------------------------------------------------------------------
	 * LOCAL STATE
	 * ----------------------------------------------------------------------------------
	 */
	const [vote, setVote] = useState('Abstain');

	/*
	 * ----------------------------------------------------------------------------------
	 * REACT QUERY
	 * ----------------------------------------------------------------------------------
	 */
	const createVoteMutation = useMutation({
		mutationFn: createVote,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['voteHistory'] });
			queryClient.invalidateQueries({ queryKey: ['ballot', ballotId] });
		},
	});

	/*
	 * ----------------------------------------------------------------------------------
	 * HANDLERS
	 * ----------------------------------------------------------------------------------
	 */

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

	/*
	 * ----------------------------------------------------------------------------------
	 * RENDER COMPONENT
	 * ----------------------------------------------------------------------------------
	 */
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
