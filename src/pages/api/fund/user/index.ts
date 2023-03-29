import { Fund, UserFund } from '@/modules/funds';
import { IFund, IFundDoc, IUserFund } from '@/modules/funds/fund.interfaces';
import { User } from '@/modules/users';
import { IUserDoc } from '@/modules/users/user.interfaces';
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

	switch (req.method) {
		case 'GET':
			try {
				const userFunds = await UserFund.find({
					user: new mongoose.Types.ObjectId(session.user.id),
				}).populate('fund');
				res.status(200).json(userFunds);
			} catch (err) {
				console.log(err);
				res.status(400).json({ message: 'Could not get user funds.' });
			}
			break;
		case 'POST':
			try {
				const userFundBody: IUserFund = req.body;

				if (typeof userFundBody.fund !== 'string') {
					return res
						.status(400)
						.json({ message: 'Could not asign fund to user.' });
				}

				const userFund = await UserFund.findOne({
					user: new mongoose.Types.ObjectId(session.user.id),
					fund: new mongoose.Types.ObjectId(userFundBody.fund),
				});

				if (userFund) {
					return res
						.status(400)
						.json({ message: 'User is already invested in this fund.' });
				}

				const indexFund: IFundDoc | null = await Fund.findById(
					userFundBody.fund
				);

				if (!indexFund) {
					return res.status(404).json({ message: 'Could not find fund.' });
				}

				const user: IUserDoc | null = await User.findById(session.user.id);

				if (!user) {
					return res.status(404).send('Could not find user.');
				}

				const newUserBalance = user.balance - userFundBody.value;

				if (newUserBalance < 0) {
					return res
						.status(400)
						.json({ message: 'User has insufficient funds.' });
				}

				await user.updateOne({ balance: newUserBalance });

				const fund = await UserFund.create({
					...userFundBody,
					user: new mongoose.Types.ObjectId(session.user.id),
				});

				res.status(200).json(fund);
			} catch (err) {
				console.log(err);
				res.status(400).json({ message: 'Could not create user fund.' });
			}
			break;
		default:
			res.status(405).json({ message: 'Method not supported.' });
	}
}
