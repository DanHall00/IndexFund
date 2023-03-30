const getAllStocks = async () => {
	try {
		const stocks = await (
			await fetch(`/api/stock`, {
				headers: { 'Content-Type': 'application/json' },
			})
		).json();
		return stocks;
	} catch (e) {
		return { error: 'Could not load available ballots.' };
	}
};

export { getAllStocks };
