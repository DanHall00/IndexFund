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

export { getAvailableBallots, getBallotById, getUpcomingBallots };
