import { Ballot } from '@/modules/ballots';
import { Stock } from '@/modules/stocks';
import { Vote } from '@/modules/votes';
import {
	IVoteDoc,
	UpdateVoteBody,
	VoteOption,
} from '@/modules/votes/vote.interfaces';
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

	const { id } = req.query;

	await dbConnect();

	switch (req.method) {
		case 'GET':
			try {
				const vote: IVoteDoc | null = await Vote.findById<IVoteDoc>({
					_id: id,
					user: session.user.id,
				}).populate('ballot');

				if (!vote) {
					return res.status(404).json({ message: 'Could not find vote.' });
				}

				const stock = await Stock.findById(vote.ballot.stock);

				if (!stock) {
					return res.status(404).json({ message: 'Could not find stock.' });
				}

				const votes = await Vote.find({
					ballot: new mongoose.Types.ObjectId(String(vote.ballot.id)),
				}).select('action');

				return res.status(200).json({ vote, stock, results: votes });
			} catch (err) {
				console.log(err);
				return res.status(500).json({ message: 'Could not get vote.' });
			}
		case 'PUT':
			try {
				const vote: IVoteDoc | null = await Vote.findById<IVoteDoc>(
					id
				).populate('ballot');

				if (!vote) {
					return res.status(400).json({ message: 'Vote not found.' });
				}

				const currentDate: Date = new Date();
				const ballotStart: Date = new Date(vote.ballot.ballotStart);
				const ballotEnd: Date = new Date(vote.ballot.ballotEnd);

				if (ballotStart > currentDate) {
					return res
						.status(400)
						.json({ message: 'Voting for this ballothas not started yet.' });
				}

				if (ballotEnd < currentDate) {
					return res
						.status(400)
						.json({ message: 'Voting for this ballot has ended.' });
				}

				const updatedVote: UpdateVoteBody = req.body;

				if (updatedVote.action === undefined) {
					return res
						.status(400)
						.json({ message: 'You must submit an action.' });
				}

				if (vote.action !== VoteOption.NO_VOTE) {
					return res.status(400).json({
						message: 'You have already submitted your vote for this ballot.',
					});
				}

				vote.action = updatedVote.action;

				await vote.save();

				return res.status(200).json(vote);
			} catch (err) {
				console.log(err);
				return res.status(500).json({ message: 'Could not update vote.' });
			}
		case 'DELETE':
			if (session.user.role !== 'admin') {
				return res.status(403).json({ message: 'Admin only endpoint.' });
			}
			try {
				await Vote.findByIdAndDelete(id);
				return res.status(200).json({ message: 'Successfully deleted vote.' });
			} catch (err) {
				console.error(err);
				return res.status(500).json({ message: 'Could not delete vote' });
			}
		default:
			return res.status(405).json({ message: 'Method not supported.' });
	}
}
