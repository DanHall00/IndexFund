import mongoose from 'mongoose';
import { toJSON } from '../toJSON';
import { IUserFundDoc, IUserFundModel } from './fund.interfaces';

/*
 * ----------------------------------------------------------------------------------
 * USERFUND SCHEMA
 * ----------------------------------------------------------------------------------
 */
const userFundSchema = new mongoose.Schema<IUserFundDoc, IUserFundModel>(
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

export default mongoose.models.UserFund ||
	mongoose.model<IUserFundDoc, IUserFundModel>('UserFund', userFundSchema);
