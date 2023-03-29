const getFunds = async () => {
	try {
		const funds = await (
			await fetch(`/api/fund`, {
				headers: { 'Content-Type': 'application/json' },
			})
		).json();
		return funds;
	} catch (e) {
		return { error: 'Could not load funds.' };
	}
};

const getUserFunds = async () => {
	try {
		const funds = await (
			await fetch(`/api/fund/user`, {
				headers: { 'Content-Type': 'application/json' },
			})
		).json();
		return funds;
	} catch (e) {
		return { error: 'Could not load funds.' };
	}
};

const getFundById = async (id: any) => {
	try {
		const fund = await (
			await fetch(`/api/fund/${id}`, {
				headers: { 'Content-Type': 'application/json' },
			})
		).json();
		return fund;
	} catch (e) {
		return { error: 'Could not load fund.' };
	}
};

export { getFundById, getFunds, getUserFunds };
