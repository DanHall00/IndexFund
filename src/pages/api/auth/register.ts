import { User } from '@/modules/users';
import { NewCreatedUser } from '@/modules/users/user.interfaces';
import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../../lib/mongodb';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { username, password, email }: NewCreatedUser = req.body;
	await dbConnect();

	switch (req.method) {
		case 'POST':
			try {
				const user = await User.create({ username, password, email });
				res.status(200).json(user);
			} catch (err) {
				console.log(err);
				res.status(400).json({ message: 'Could not create user.' });
			}
		default:
			res.status(405).json({ message: 'Method not supported.' });
	}
}
