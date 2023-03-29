import { Fund } from '@/modules/funds';
import { IFund, IFundDoc } from '@/modules/funds/fund.interfaces';
import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import dbConnect from '../../../../../../lib/mongodb';
import { authOptions } from '../../../auth/[...nextauth]';

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
		case 'DELETE':
			if (session.user.role !== 'admin') {
				return res.status(403).json({ message: 'Admin only endpoint.' });
			}

			const { id, assetid } = req.query;

			if (!assetid || assetid === undefined || typeof assetid !== 'string') {
				return res.status(500).json({ message: 'Asset not provided.' });
			}

			try {
				const fund: IFundDoc | null = await Fund.findById(id);

				if (!fund) {
					return res.status(404).json({ message: 'Could not find fund.' });
				}

				const updatedFund = await fund.updateOne({
					$pull: {
						assets: new mongoose.Types.ObjectId(assetid),
					},
				});

				return res.status(200).json(updatedFund);
			} catch (err) {
				console.log(err);
				return res.status(400).json({ message: 'Could not add asset.' });
			}
		default:
			return res.status(405).json({ message: 'Method not supported.' });
	}
}
