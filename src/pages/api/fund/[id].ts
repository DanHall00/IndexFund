import { Fund } from '@/modules/funds';
import { IFund } from '@/modules/funds/fund.interfaces';
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
				const fund = await Fund.findOne({ _id: id }).populate('assets');
				res.status(200).json(fund);
			} catch (err) {
				console.log(err);
				res.status(400).json({ message: 'Could not get fund.' });
			}
			break;
		default:
			res.status(405).json({ message: 'Method not supported.' });
	}
}
