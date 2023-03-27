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
			try {
				const funds = await Fund.find({}).populate('assets');
				res.status(200).json(funds);
			} catch (err) {
				console.log(err);
				res.status(400).json({ message: 'Could not get funds.' });
			}
			break;
		case 'POST':
			const { name, assets }: IFund = JSON.parse(req.body);
			try {
				const fund = await Fund.create({ name, assets });
				res.status(200).json(fund);
			} catch (err) {
				console.log(err);
				res.status(400).json({ message: 'Could not create fund.' });
			}
			break;
		default:
			res.status(405).json({ message: 'Method not supported.' });
	}
}
