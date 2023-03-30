import mongoose, { Document, Model } from 'mongoose';

/**
 * Interface to define a user
 *
 * @export
 * @interface IUser
 */
export interface IUser {
	username: string;
	email: string;
	account_number: string;
	password: string;
	role: string;
	balance: number;
}

/**
 * Interface to add User properties to a MongoDB document
 *
 * @export
 * @interface IUserDoc
 * @extends {IUser}
 * @extends {Document}
 */
export interface IUserDoc extends IUser, Document {
	isPasswordMatch(password: string): Promise<boolean>;
}

/**
 * Interface to create a Model for User
 *
 * @export
 * @interface IUserModel
 * @extends {Model<IUserDoc>}
 */
export interface IUserModel extends Model<IUserDoc> {
	isUsernameTaken(
		username: string,
		excludeUserId?: mongoose.Types.ObjectId
	): Promise<boolean>;
}

export type UpdateUserBody = Partial<IUser>;

export type NewCreatedUser = Omit<IUser, 'role' | 'balance'>;
