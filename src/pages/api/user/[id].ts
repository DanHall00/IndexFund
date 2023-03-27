import { Stock } from '@/modules/stocks';
import { IStock } from '@/modules/stocks/stock.interfaces';
import { User } from '@/modules/users';
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../../lib/mongodb';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await dbConnect();

	switch (req.method) {
		case 'GET':
			const { id } = req.query;
			try {
				const user = await User.findOne({ _id: id }).select('-role');
				res.status(200).json(user);
			} catch (err) {
				console.log(err);
				res.status(400).json({ message: 'Could not get user.' });
			}
			break;
		default:
			res.status(405).json({ message: 'Method not supported.' });
	}
}
