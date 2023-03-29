import { Ballot } from '@/modules/ballots';
import { IBallot } from '@/modules/ballots/ballot.interfaces';
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
				const ballots = await Ballot.find({});
				res.status(200).json(ballots);
			} catch (err) {
				console.log(err);
				res.status(400).json({ message: 'Could not get ballots.' });
			}
			break;
		case 'POST':
			if (session.user.role !== 'admin') {
				return res.status(403).json({ message: 'Admin only endpoint.' });
			}
			const ballotBody: IBallot = req.body;
			try {
				const ballot = await Ballot.create(ballotBody);
				res.status(200).json(ballot);
			} catch (err) {
				console.log(err);
				res.status(400).json({ message: 'Could not create ballot.' });
			}
			break;
		default:
			res.status(405).json({ message: 'Method not supported.' });
	}
}
