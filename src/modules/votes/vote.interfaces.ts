import { Document, Model } from 'mongoose';
import { IBallotDoc } from '../ballots/ballot.interfaces';
import { IUserDoc } from '../users/user.interfaces';

/**
 * Voting Options
 *
 * @export
 * @enum {number}
 */
export enum VoteOption {
	FOR = 'For',
	AGAINST = 'Against',
	ABSTAIN = 'Abstain',
	NO_VOTE = 'No Vote',
}

/**
 * Interface to define properties in a vote
 *
 * @export
 * @interface IVote
 */
export interface IVote {
	user: IUserDoc;
	ballot: IBallotDoc;
	action: string;
}

/**
 * Interface to add Vote to a MongoDB Document
 *
 * @export
 * @interface IVoteDoc
 * @extends {IVote}
 * @extends {Document}
 */
export interface IVoteDoc extends IVote, Document {}

/**
 * Interface to create a Model for Vote
 *
 * @export
 * @interface IVoteModel
 * @extends {Model<IVoteDoc>}
 */
export interface IVoteModel extends Model<IVoteDoc> {}

export type UpdateVoteBody = Partial<IVote>;
