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

export { getCurrentUser };
