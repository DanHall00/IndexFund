import { Ballot } from '@/modules/ballots';
import { Vote } from '@/modules/votes';
import { IVote } from '@/modules/votes/vote.interfaces';
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
				const votes = await Vote.find({ user: session.user.id })
					.populate('ballot')
					.sort('desc');
				res.status(200).json(votes);
			} catch (err) {
				console.log(err);
				res.status(400).json({ message: 'Could not get votes.' });
			}
			break;
		case 'POST':
			const voteBody: IVote = req.body;
			try {
				const existingVote = await Vote.findOne({
					ballot: voteBody.ballot,
					user: new mongoose.Types.ObjectId(session.user.id),
				});

				if (existingVote) {
					return res.status(500).json({
						message: 'You can not vote for the same ballot more than once.',
					});
				}

				const ballot = await Ballot.findById(voteBody.ballot);

				if (!ballot) {
					return res.status(404).json({
						message: 'Could not find ballot.',
					});
				}

				const currentDate: Date = new Date();
				const ballotStart: Date = new Date(ballot.ballotStart);
				const ballotEnd: Date = new Date(ballot.ballotEnd);

				if (ballotStart > currentDate) {
					return res.status(400).json({
						message: 'Voting for this ballothas not started yet.',
					});
				}

				if (ballotEnd < currentDate) {
					return res
						.status(400)
						.json({ message: 'Voting for this ballot has ended.' });
				}

				const vote = await Vote.create({
					...voteBody,
					user: new mongoose.Types.ObjectId(session.user.id),
				});
				res.status(200).json(vote);
			} catch (err) {
				console.log(err);
				res.status(400).json({ message: 'Could not create vote.' });
			}
			break;
		default:
			res.status(405).json({ message: 'Method not supported.' });
	}
}
