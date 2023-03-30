import { Ballot } from '@/modules/ballots';
import {
	IBallotDoc,
	UpdateBallotBody,
} from '@/modules/ballots/ballot.interfaces';
import { Stock } from '@/modules/stocks';
import { IStock, UpdateStockBody } from '@/modules/stocks/stock.interfaces';
import { Vote } from '@/modules/votes';
import { IVoteDoc } from '@/modules/votes/vote.interfaces';
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
				const ballot = await Ballot.findById(id).populate('stock');

				if (!ballot) {
					return res.status(404).json({ message: 'Could not find ballot.' });
				}

				const userVote = await Vote.findOne<IVoteDoc>({
					ballot: new mongoose.Types.ObjectId(String(id)),
					user: new mongoose.Types.ObjectId(String(session.user.id)),
				});

				let votes;

				if (userVote) {
					votes = await Vote.find({
						ballot: new mongoose.Types.ObjectId(String(id)),
					}).select('action');
				}

				return res.status(200).json({ ballot, votes, vote: userVote?.action });
			} catch (err) {
				console.log(err);
				return res.status(500).json({ message: 'Could not get ballot.' });
			}
		case 'PUT':
			if (session.user.role !== 'admin') {
				return res.status(403).json({ message: 'Admin only endpoint.' });
			}
			try {
				const ballot: IBallotDoc | null = await Ballot.findById<IBallotDoc>(id);

				if (!ballot) {
					return res.status(400).json({ message: 'Ballot not found.' });
				}

				const updatedBallot: UpdateBallotBody = req.body;

				Object.assign(ballot, updatedBallot);

				await ballot.save();

				return res.status(200).json(ballot);
			} catch (err) {
				console.log(err);
				return res.status(500).json({ message: 'Could not create ballot.' });
			}
		case 'DELETE':
			if (session.user.role !== 'admin') {
				return res.status(403).json({ message: 'Admin only endpoint.' });
			}
			try {
				await Ballot.findByIdAndDelete(id);
				return res
					.status(200)
					.json({ message: 'Successfully deleted ballot.' });
			} catch (err) {
				console.error(err);
				return res.status(500).json({ message: 'Could not delete ballot.' });
			}
		default:
			return res.status(405).json({ message: 'Method not supported.' });
	}
}
