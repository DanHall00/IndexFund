/**
 * Get All Ballots for a user which are currently available for voting
 *
 * @return {*}
 */
const getAvailableBallots = async () => {
	try {
		const votes = await (
			await fetch(`/api/ballot/user?type=available`, {
				headers: { 'Content-Type': 'application/json' },
			})
		).json();
		return votes;
	} catch (e) {
		return { error: 'Could not load available ballots.' };
	}
};

/**
 * Get All Ballots for a user which are not yet open for voting
 *
 * @return {*}
 */
const getUpcomingBallots = async () => {
	try {
		const votes = await (
			await fetch(`/api/ballot/user?type=upcoming`, {
				headers: { 'Content-Type': 'application/json' },
			})
		).json();
		return votes;
	} catch (e) {
		return { error: 'Could not load upcoming ballots.' };
	}
};

/**
 * Get a ballot by id
 *
 * @param {*} id Id of Ballot
 * @return {*}
 */
const getBallotById = async (id: any) => {
	try {
		const ballot = await (
			await fetch(`/api/ballot/${id}`, {
				headers: { 'Content-Type': 'application/json' },
			})
		).json();
		return ballot;
	} catch (e) {
		return { error: 'Could not load ballot.' };
	}
};

export { getAvailableBallots, getBallotById, getUpcomingBallots };
