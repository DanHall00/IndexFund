import mongoose from 'mongoose';
import { paginate } from '../paginate';
import { toJSON } from '../toJSON';
import { IVoteDoc, IVoteModel, VoteOption } from './vote.interfaces';

const voteSchema = new mongoose.Schema<IVoteDoc>(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		stockId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Stock',
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

export default mongoose.models.Vote ||
	mongoose.model<IVoteDoc, IVoteModel>('Vote', voteSchema);
