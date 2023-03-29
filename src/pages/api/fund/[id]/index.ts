import { Fund } from '@/modules/funds';
import {
	IFund,
	IFundDoc,
	UpdateFundBody,
} from '@/modules/funds/fund.interfaces';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import dbConnect from '../../../../../lib/mongodb';
import { authOptions } from '../../auth/[...nextauth]';

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
				const stock = await Fund.findById(id).populate('assets');
				return res.status(200).json(stock);
			} catch (err) {
				console.log(err);
				return res.status(500).json({ message: 'Could not get funds.' });
			}
		case 'PUT':
			if (session.user.role !== 'admin') {
				return res.status(403).json({ message: 'Admin only endpoint.' });
			}

			try {
				const fund: IFundDoc | null = await Fund.findById(id);

				if (!fund) {
					return res.status(400).json({ message: 'Fund not found.' });
				}

				const updatedFund: UpdateFundBody = req.body;

				Object.assign(fund, updatedFund);

				await fund.save();

				return res.status(200).json(fund);
			} catch (err) {
				console.log(err);
				return res.status(500).json({ message: 'Could not create fund.' });
			}
		case 'DELETE':
			if (session.user.role !== 'admin') {
				return res.status(403).json({ message: 'Admin only endpoint.' });
			}
			try {
				await Fund.findByIdAndDelete(id);
				return res.status(200).json({ message: 'Successfully deleted fund.' });
			} catch (err) {
				console.error(err);
				return res.status(500).json({ message: 'Could not delete fund' });
			}
		default:
			return res.status(405).json({ message: 'Method not supported.' });
	}
}
