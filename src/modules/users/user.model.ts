import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { customAlphabet } from 'nanoid';
import { roles } from '../../config/roles';
import { paginate } from '../paginate';
import { toJSON } from '../toJSON';
import { IUserDoc, IUserModel } from './user.interfaces';

const nanoid = customAlphabet('123456789', 15);

const userSchema = new mongoose.Schema<IUserDoc>(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
			minlength: 8,
			validate(value: string) {
				if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
					throw new Error(
						'Password must contain at least one letter and one number'
					);
				}
			},
			private: true,
		},
		account_number: {
			type: String,
			required: true,
			default: () => nanoid(15),
			index: { unique: true },
		},
		role: {
			type: String,
			enum: roles,
			default: 'user',
		},
		balance: { type: Number, default: 100000 },
	},
	{ timestamps: true }
);

userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * Check if username is taken
 * @param {string} username - The user's username
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.static(
	'isUsernameTaken',
	async function (
		username: string,
		excludeUserId: mongoose.ObjectId
	): Promise<boolean> {
		const user = await this.findOne({ username, _id: { $ne: excludeUserId } });
		return !!user;
	}
);

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.method(
	'isPasswordMatch',
	async function (password: string): Promise<boolean> {
		const account = this;
		return bcrypt.compare(password, account.password);
	}
);

userSchema.pre('save', async function (next) {
	const account = this;
	if (account.isModified('password')) {
		account.password = await bcrypt.hash(account.password, 8);
	}
	next();
});

export default mongoose.models.User ||
	mongoose.model<IUserDoc, IUserModel>('User', userSchema);
