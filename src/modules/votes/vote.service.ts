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

export { getVoteById, getVotingHistory };
