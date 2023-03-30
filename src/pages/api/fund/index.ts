import { Fund } from '@/modules/funds';
import { IFund } from '@/modules/funds/fund.interfaces';
import { Stock } from '@/modules/stocks';
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

	await dbConnect();

	switch (req.method) {
		case 'GET':
			try {
				const funds = await Fund.find({}).populate({
					path: 'assets',
					model: Stock,
				});
				res.status(200).json(funds);
			} catch (err) {
				console.log(err);
				res.status(400).json({ message: 'Could not get funds.' });
			}
			break;
		case 'POST':
			if (session.user.role !== 'admin') {
				return res.status(403).json({ message: 'Admin only endpoint.' });
			}
			const fundBody: IFund = req.body;
			try {
				const fund = await Fund.create(fundBody);
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
