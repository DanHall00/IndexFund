/**
 * Create a new user fund
 *
 * @param {{
 * 	fund: string;
 * 	initialValue: number;
 * 	value: number;
 * }} updateBody
 * @return {*}
 */
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

/**
 * Get a fund by an ID
 *
 * @param {*} id
 * @return {*}
 */
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

/**
 * Get all funds
 *
 * @return {*}
 */
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

/**
 * Get a UserFund by id
 *
 * @param {*} id
 * @return {*}
 */
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

/**
 * Get all UserFunds for a user
 *
 * @return {*}
 */
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

export { createUserFund, getFundById, getFunds, getUserFundById, getUserFunds };
