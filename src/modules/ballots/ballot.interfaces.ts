import { Document, Model } from 'mongoose';
import { IStockDoc } from '../stocks/stock.interfaces';

/**
 * Categories for ballots
 *
 * @export
 * @enum {number}
 */
export enum BallotCategory {
	REPORTS = 'Reports',
	ACCOUNTS = 'Accounts',
	DIVIDENDS = 'Dividends',
	DIRECTORS = 'Directors',
	AUDITS = 'Audits',
	SHARE_ALLOCATION = 'Share Allocation',
	DONATIONS = 'Donations',
	OTHER = 'Other',
}

/**
 * Interface to define a ballot
 *
 * @export
 * @interface IBallot
 */
export interface IBallot {
	stock: IStockDoc;
	title: string;
	description: string;
	ballotStart: Date;
	ballotEnd: Date;
	category: string;
}

/**
 * Interface to create a MongoDB document with ballot properties
 *
 * @export
 * @interface IBallotDoc
 * @extends {IBallot}
 * @extends {Document}
 */
export interface IBallotDoc extends IBallot, Document {}

/**
 * Interface to create a model for the BallotDoc
 *
 * @export
 * @interface IBallotModel
 * @extends {Model<IBallotDoc>}
 */
export interface IBallotModel extends Model<IBallotDoc> {}

export type UpdateBallotBody = Partial<IBallot>;
