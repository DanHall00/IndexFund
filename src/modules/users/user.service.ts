/**
 * Get User currently logged in
 *
 * @return {*}
 */
const getCurrentUser = async () => {
	try {
		const user = await (
			await fetch(`/api/user/me`, {
				headers: { 'Content-Type': 'application/json' },
			})
		).json();
		return user;
	} catch (e) {
		console.log(e);
		throw new Error('Could not get user.');
	}
};

/**
 * Get All Users
 *
 * @return {*}
 */
const getAllUsers = async () => {
	try {
		const user = await (
			await fetch(`/api/user`, {
				headers: { 'Content-Type': 'application/json' },
			})
		).json();
		return user;
	} catch (e) {
		console.log(e);
		throw new Error('Could not get users.');
	}
};

export { getAllUsers, getCurrentUser };
