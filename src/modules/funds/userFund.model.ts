import mongoose from 'mongoose';
import { customAlphabet } from 'nanoid';
import { roles } from '../../config/roles';
import { paginate } from '../paginate';
import { toJSON } from '../toJSON';
import { IUserFundDoc, IUserFundModel } from './fund.interfaces';

const userFundSchema = new mongoose.Schema<IUserFundDoc>(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		fund: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Fund',
		},
		initialValue: Number,
		value: Number,
		active: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true }
);

userFundSchema.plugin(toJSON);
userFundSchema.plugin(paginate);

export default mongoose.models.UserFund ||
	mongoose.model<IUserFundDoc, IUserFundModel>('UserFund', userFundSchema);
