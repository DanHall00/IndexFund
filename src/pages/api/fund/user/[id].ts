import { Ballot } from '@/modules/ballots';
import { IBallotDoc } from '@/modules/ballots/ballot.interfaces';
import { Fund, UserFund } from '@/modules/funds';
import {
	IFundDoc,
	IUserFundDoc,
	UpdateUserFundBody,
} from '@/modules/funds/fund.interfaces';
import mongoose from 'mongoose';
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
				const userFund: IUserFundDoc | null =
					await UserFund.findById<IUserFundDoc>(id);
				if (!userFund) {
					return res.status(404).json({ message: 'Could not find user fund.' });
				}

				const fund: IFundDoc | null = await Fund.findById<IFundDoc>(
					userFund.fund
				).populate('assets');

				if (!fund) {
					return res.status(404).json({ message: 'Could not find fund.' });
				}

				const ballots = await Ballot.find({
					stock: {
						$in: fund.assets.map(
							(asset) => new mongoose.Types.ObjectId(asset.id)
						),
					},
				})
					.populate('stock')
					.sort({ ballotStart: 'desc' });

				return res.status(200).json({ userFund: userFund, fund, ballots });
			} catch (err) {
				console.log(err);
				return res.status(500).json({ message: 'Could not get user fund.' });
			}
		case 'PUT':
			if (session.user.role !== 'admin') {
				return res.status(403).json({ message: 'Admin only endpoint.' });
			}
			try {
				const userFund: IUserFundDoc | null =
					await UserFund.findById<IUserFundDoc>(id);
				if (!userFund) {
					return res.status(400).json({ message: 'User Fund not found.' });
				}

				const updatedUserFund: UpdateUserFundBody = req.body;

				Object.assign(userFund, updatedUserFund);

				await userFund.save();

				return res.status(200).json(userFund);
			} catch (err) {
				console.log(err);
				return res.status(500).json({ message: 'Could not create user fund.' });
			}
		case 'DELETE':
			if (session.user.role !== 'admin') {
				return res.status(403).json({ message: 'Admin only endpoint.' });
			}
			try {
				await UserFund.findByIdAndDelete(id);
				return res
					.status(200)
					.json({ message: 'Successfully deleted user fund.' });
			} catch (err) {
				console.error(err);
				return res.status(500).json({ message: 'Could not delete user fund.' });
			}
		default:
			return res.status(405).json({ message: 'Method not supported.' });
	}
}
