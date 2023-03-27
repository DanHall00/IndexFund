const getUserById = async (id: string | undefined) => {
	try {
		const user = await (
			await fetch(`/api/user/${id}`, {
				headers: { 'Content-Type': 'application/json' },
			})
		).json();
		return user;
	} catch (e) {
		console.log(e);
		throw new Error('Could not get user.');
	}
};

export { getUserById };
