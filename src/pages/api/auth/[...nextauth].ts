import { User } from '@/modules/users';
import { IUser, IUserDoc } from '@/modules/users/user.interfaces';
import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '../../../../lib/mongodb';

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Username and Password',
			credentials: {
				username: { label: 'Username', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials, req) {
				try {
					dbConnect();
					if (!credentials)
						throw new Error('Username or Password can not be blank.');
					const user = await User.findOne<IUserDoc>({
						username: credentials?.username,
					}).select('+password');

					if (!user) throw new Error('Username/Password was invalid.');

					const validPassword = await user.isPasswordMatch(
						credentials?.password
					);

					if (!validPassword) throw new Error('Username/Password was invalid.');

					return {
						username: user.username,
						email: user.email,
						id: user._id,
						account_number: user.account_number,
						role: user.role,
					};
				} catch (err) {
					console.error(err);
					throw err;
				}
			},
		}),
	],
	pages: {
		signIn: '/login',
	},
	session: {
		strategy: 'jwt',
	},
	callbacks: {
		session: async ({ session, token }) => {
			if (token) {
				session.user = token.user;
			}
			return session;
		},
		jwt: async ({ user, token }) => {
			if (user) {
				token.user = {
					id: user.id,
					username: user.username,
					email: user.email,
					role: user.role,
					account_number: user.account_number,
				};
			}
			return token;
		},
	},
};

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
	return await NextAuth(req, res, authOptions);
}
