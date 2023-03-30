import { Ballot } from '@/modules/ballots';
import { IBallot } from '@/modules/ballots/ballot.interfaces';
import { UserFund } from '@/modules/funds';
import { IUserFundDoc } from '@/modules/funds/fund.interfaces';
import mongoose from 'mongoose';
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
				const userFunds: IUserFundDoc[] = await UserFund.find({
					user: new mongoose.Types.ObjectId(session.user.id),
				}).populate('fund');

				let allAssets: any = [];

				for (const userFundIndex in userFunds) {
					allAssets = [...allAssets, ...userFunds[userFundIndex].fund.assets];
				}

				const dedupedAssets = [...new Set([...allAssets])];

				const { type } = req.query;

				let ballots: any[] = [];

				if (type === undefined) {
					const allBallots = await Ballot.find({
						stock: { $in: dedupedAssets },
					}).populate('stock');
					ballots = [...ballots, ...allBallots];
				}

				const options = String(type).split(',');

				const currentDate = new Date().toISOString();

				if (options.includes('available')) {
					const availableBallots = await Ballot.find({
						stock: { $in: dedupedAssets },
						ballotStart: { $lte: currentDate },
						ballotEnd: { $gt: currentDate },
					})
						.populate('stock')
						.sort({ ballotStart: 'desc' });
					ballots = [...ballots, ...availableBallots];
				}

				if (options.includes('upcoming')) {
					const upcomingBallots = await Ballot.find({
						stock: { $in: dedupedAssets },
						ballotStart: { $gt: currentDate },
					})
						.populate('stock')
						.sort({ ballotStart: 'desc' });
					ballots = [...ballots, ...upcomingBallots];
				}

				res.status(200).json(ballots);
			} catch (err) {
				console.log(err);
				res.status(400).json({ message: 'Could not get ballots.' });
			}
			break;
		default:
			res.status(405).json({ message: 'Method not supported.' });
	}
}
