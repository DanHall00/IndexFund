import { IStockDoc } from '@/modules/ballots/stock.interfaces';
import { Stock } from '@/modules/stocks';
import { IStock, UpdateStockBody } from '@/modules/stocks/stock.interfaces';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import dbConnect from '../../../../lib/mongodb';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await getServerSession(req, res, authOptions);

	if (!session) {
		return res.status(401).json({ message: 'User must be logged in.' });
	}

	const { id } = req.query;

	await dbConnect();

	switch (req.method) {
		case 'GET':
			try {
				const stock = await Stock.findById(id);
				res.status(200).json(stock);
			} catch (err) {
				console.log(err);
				res.status(400).json({ message: 'Could not get stocks.' });
			}
			break;
		case 'PUT':
			try {
				const stock = await Stock.findById<IStockDoc>(id);

				const updatedStock: UpdateStockBody = req.body;
				Object.assign(stock, updatedStock);

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
