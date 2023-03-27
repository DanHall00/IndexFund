import mongoose, { Document, Model } from 'mongoose';
import { QueryResult } from '../paginate/paginate';

export interface IUser {
	username: string;
	email: string;
	account_number: string;
	password: string;
	role: string;
	balance?: number;
}

export interface IUserDoc extends IUser, Document {
	isPasswordMatch(password: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUserDoc> {
	isUsernameTaken(
		username: string,
		excludeUserId?: mongoose.Types.ObjectId
	): Promise<boolean>;
	paginate(
		filter: Record<string, any>,
		options: Record<string, any>
	): Promise<QueryResult>;
}

export type UpdateUserBody = Partial<IUser>;

export type NewCreatedUser = Omit<IUser, 'role' | 'balance'>;
