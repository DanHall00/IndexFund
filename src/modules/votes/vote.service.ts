const getVotingHistory = async () => {
	try {
		const votes = await (
			await fetch(`/api/vote`, {
				headers: { 'Content-Type': 'application/json' },
			})
		).json();
		return votes;
	} catch (e) {
		return { error: 'Could not load votes.' };
	}
};

const getVoteById = async (id: any) => {
	try {
		const vote = await (
			await fetch(`/api/vote/${id}`, {
				headers: { 'Content-Type': 'application/json' },
			})
		).json();
		return vote;
	} catch (e) {
		return { error: 'Could not load vote.' };
	}
};

const createVote = async (updateBody: { ballot: string; action: string }) => {
	try {
		const vote = await (
			await fetch(`/api/vote`, {
				headers: { 'Content-Type': 'application/json' },
				method: 'POST',
				body: JSON.stringify(updateBody),
			})
		).json();
		return vote;
	} catch (e) {
		return { error: 'Could not load vote.' };
	}
};

export { createVote, getVoteById, getVotingHistory };
