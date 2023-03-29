import { User } from '@/modules/users';
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
			if (session.user.role !== 'admin') {
				return res.status(403).json({ message: 'Admin only endpoint.' });
			}
			try {
				const users = await User.find({}).select('-password');
				res.status(200).json(users);
			} catch (err) {
				console.log(err);
				res.status(400).json({ message: 'Could not get users.' });
			}
			break;
		default:
			res.status(405).json({ message: 'Method not supported.' });
	}
}
