import { Mongoose } from 'mongoose';
import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
	interface User {
		id: string;
		username: string;
		email: string;
		account_number: string;
		role: string;
	}
	interface Session extends DefaultSession {
		user: User;
	}
}

declare module 'next-auth/jwt' {
	interface User {
		id: string;
		username: string;
		email: string;
		account_number: string;
		role: string;
	}
	interface JWT {
		user: User;
	}
}

declare global {
	var mongoose: { conn: null | Mongoose; promise: null | Promise<Mongoose> };
}
