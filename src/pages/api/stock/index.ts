import { Stock } from '@/modules/stocks';
import { IStock } from '@/modules/stocks/stock.interfaces';
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../../lib/mongodb';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await dbConnect();

	switch (req.method) {
		case 'GET':
			try {
				const stocks = await Stock.find({});
				res.status(200).json(stocks);
			} catch (err) {
				console.log(err);
				res.status(400).json({ message: 'Could not get stocks.' });
			}
			break;
		case 'POST':
			const { name, abbreviation, sector, price }: IStock = req.body;
			try {
				const stock = await Stock.create({ name, abbreviation, sector, price });
				res.status(200).json(stock);
			} catch (err) {
				console.log(err);
				res.status(400).json({ message: 'Could not create stock.' });
			}
			break;
		default:
			res.status(405).json({ message: 'Method not supported.' });
	}
}
