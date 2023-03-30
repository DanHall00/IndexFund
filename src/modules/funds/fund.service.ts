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

const createUserFund = async (updateBody: {
	fund: string;
	initialValue: number;
	value: number;
}) => {
	try {
		const userFund = await (
			await fetch(`/api/fund/user`, {
				headers: { 'Content-Type': 'application/json' },
				method: 'POST',
				body: JSON.stringify(updateBody),
			})
		).json();
		return userFund;
	} catch (e) {
		return { error: 'Could not create user fund.' };
	}
};

const getUserFundById = async (id: any) => {
	try {
		const fund = await (
			await fetch(`/api/fund/user/${id}`, {
				headers: { 'Content-Type': 'application/json' },
			})
		).json();
		return fund;
	} catch (e) {
		return { error: 'Could not load fund.' };
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

export { createUserFund, getFundById, getFunds, getUserFundById, getUserFunds };
