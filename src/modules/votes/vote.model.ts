import mongoose from 'mongoose';
import { paginate } from '../paginate';
import { toJSON } from '../toJSON';
import { IVoteDoc, IVoteModel, VoteOption } from './vote.interfaces';

const voteSchema = new mongoose.Schema<IVoteDoc>(
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
voteSchema.plugin(paginate);

export default mongoose.model<IVoteDoc, IVoteModel>('Vote', voteSchema);
