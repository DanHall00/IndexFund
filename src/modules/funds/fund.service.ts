const getFunds = async () => {
	try {
		const funds = await (
			await fetch(`/api/fund`, {
				headers: { 'Content-Type': 'application/json' },
			})
		).json();
		return funds;
	} catch (e) {
		throw new Error('Could not get funds.');
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
		throw new Error('Could not get fund.');
	}
};

export { getFundById, getFunds };
