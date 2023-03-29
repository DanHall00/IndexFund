import { Vote } from '@/modules/votes';
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

	await dbConnect();

	const { id } = req.query;

	switch (req.method) {
		case 'GET':
			try {
				const votes = await Vote.find({
					ballot: new mongoose.Types.ObjectId(String(id)),
				}).select('action');
				res.status(200).json(votes);
			} catch (err) {
				console.log(err);
				res.status(400).json({ message: 'Could not get ballots.' });
			}
			break;
		default:
			res.status(405).json({ message: 'Method not supported.' });
	}
}
