import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { paginate } from '../paginate';
import { toJSON } from '../toJSON';
import { BallotCategory, IBallotDoc, IBallotModel } from './ballot.interfaces';

const ballotSchema = new mongoose.Schema<IBallotDoc, IBallotModel>(
	{
		stock: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Stock',
		},
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		ballotStart: {
			type: Date,
			required: true,
		},
		ballotEnd: {
			type: Date,
			required: true,
		},
		category: {
			type: String,
			enum: BallotCategory,
			default: BallotCategory.OTHER,
		},
	},
	{ timestamps: true }
);

ballotSchema.plugin(toJSON);

export default mongoose.models.Ballot ||
	mongoose.model<IBallotDoc, IBallotModel>('Ballot', ballotSchema);
