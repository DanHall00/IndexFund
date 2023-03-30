import mongoose from 'mongoose';
import { toJSON } from '../toJSON';
import { IVoteDoc, IVoteModel, VoteOption } from './vote.interfaces';

/*
 * ----------------------------------------------------------------------------------
 * VOTE SCHEMA
 * ----------------------------------------------------------------------------------
 */
const voteSchema = new mongoose.Schema<IVoteDoc, IVoteModel>(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		ballot: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Ballot',
		},
		action: {
			type: String,
			enum: VoteOption,
			default: VoteOption.NO_VOTE,
		},
	},
	{ timestamps: true }
);

voteSchema.plugin(toJSON);

export default mongoose.models.Vote ||
	mongoose.model<IVoteDoc, IVoteModel>('Vote', voteSchema);
