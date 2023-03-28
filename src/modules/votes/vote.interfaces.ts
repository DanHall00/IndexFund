import mongoose, { Document, Model } from 'mongoose';
import { QueryResult } from '../paginate/paginate';
import { IStockDoc } from '../stocks/stock.interfaces';
import { IUserDoc } from '../users/user.interfaces';

export enum VoteOption {
	FOR = 'For',
	AGAINST = 'Against',
	ABSTAIN = 'Abstain',
	NO_VOTE = 'No Vote',
}

export interface IVote {
	userId: IUserDoc;
	stockId: IStockDoc;
	action: VoteOption;
}

export interface IVoteDoc extends IVote, Document {}

export interface IVoteModel extends Model<IVoteDoc> {
	paginate(
		filter: Record<string, any>,
		options: Record<string, any>
	): Promise<QueryResult>;
}

export type UpdateStockBody = Partial<IVote>;
