import { Fund, UserFund } from '@/modules/funds';
import { IFundDoc } from '@/modules/funds/fund.interfaces';
import { User } from '@/modules/users';
import { IUserDoc, NewCreatedUser } from '@/modules/users/user.interfaces';
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
				const user: IUserDoc = await User.create<IUserDoc>({
					username,
					password,
					email,
				});

				const count = Math.floor(Math.random() * (15 - 2) + 2);

				let funds: number[] = [];

				const dbFunds: IFundDoc[] = await Fund.find<IFundDoc>({});

				for (let i = 0; i < count; i++) {
					let index = Math.floor(Math.random() * dbFunds.length);
					while (funds.indexOf(dbFunds[index].id) !== -1) {
						index = Math.floor(Math.random() * dbFunds.length);
					}
					funds.push(dbFunds[index].id);
					const initialValue =
						Math.round(
							(Math.random() * (10000 - 200) + 200 + Number.EPSILON) * 100
						) / 100;
					const value =
						Math.round(
							(Math.random() * (10000 - 200) + 200 + Number.EPSILON) * 100
						) / 100;

					if (user.balance - initialValue > 0) {
						await UserFund.create({
							fund: dbFunds[index].id,
							initialValue,
							value,
							user: user.id,
						});
						user.balance = user.balance - initialValue;
					}
				}

				user.save();

				res.status(200).json(user);
			} catch (err) {
				console.log(err);
				res.status(400).json({ message: 'Could not create user.' });
			}
		default:
			res.status(405).json({ message: 'Method not supported.' });
	}
}
