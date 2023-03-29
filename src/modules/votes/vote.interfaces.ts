import mongoose, { Document, Model } from 'mongoose';
import { IBallotDoc } from '../ballots/ballot.interfaces';
import { QueryResult } from '../paginate/paginate';
import { IUserDoc } from '../users/user.interfaces';

export enum VoteOption {
	FOR = 'For',
	AGAINST = 'Against',
	ABSTAIN = 'Abstain',
	NO_VOTE = 'No Vote',
}

export interface IVote {
	user: IUserDoc;
	ballot: IBallotDoc;
	action: string;
}

export interface IVoteDoc extends IVote, Document {}

export interface IVoteModel extends Model<IVoteDoc> {
	paginate(
		filter: Record<string, any>,
		options: Record<string, any>
	): Promise<QueryResult>;
}

export type UpdateVoteBody = Partial<IVote>;
