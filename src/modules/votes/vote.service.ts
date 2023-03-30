/**
 * Get a users voting history
 *
 * @return {*}
 */
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

/**
 * Get a vote from an ID
 *
 * @param {*} id
 * @return {*}
 */
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

/**
 * Create a new vote for a user
 *
 * @param {{ ballot: string; action: string }} updateBody
 * @return {*}
 */
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
