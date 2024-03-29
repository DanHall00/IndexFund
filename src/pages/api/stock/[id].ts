import { Stock } from '@/modules/stocks';
import {
	IStock,
	IStockDoc,
	UpdateStockBody,
} from '@/modules/stocks/stock.interfaces';
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
				return res.status(200).json(stock);
			} catch (err) {
				console.log(err);
				return res.status(500).json({ message: 'Could not get stocks.' });
			}
		case 'PUT':
			if (session.user.role !== 'admin') {
				return res.status(403).json({ message: 'Admin only endpoint.' });
			}
			try {
				const stock: IStockDoc | null = await Stock.findById<IStockDoc>(id);

				if (!stock) {
					return res.status(400).json({ message: 'Stock not found.' });
				}

				const updatedStock: UpdateStockBody = req.body;

				Object.assign(stock, updatedStock);

				await stock.save();

				return res.status(200).json(stock);
			} catch (err) {
				console.log(err);
				return res.status(500).json({ message: 'Could not create stock.' });
			}
		case 'DELETE':
			if (session.user.role !== 'admin') {
				return res.status(403).json({ message: 'Admin only endpoint.' });
			}
			try {
				await Stock.findByIdAndDelete(id);
				return res.status(200).json({ message: 'Successfully deleted stock.' });
			} catch (err) {
				console.error(err);
				return res.status(500).json({ message: 'Could not delete stock' });
			}
		default:
			return res.status(405).json({ message: 'Method not supported.' });
	}
}
