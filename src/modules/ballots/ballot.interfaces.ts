import mongoose, { Document, Model } from 'mongoose';
import { QueryResult } from '../paginate/paginate';
import { IStockDoc } from '../stocks/stock.interfaces';

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

export interface IBallot {
	stock: IStockDoc;
	title: string;
	description: string;
	ballotStart: Date;
	ballotEnd: Date;
	category: string;
}

export interface IBallotDoc extends IBallot, Document {}

export interface IBallotModel extends Model<IBallotDoc> {
	paginate(
		filter: Record<string, any>,
		options: Record<string, any>
	): Promise<QueryResult>;
}

export type UpdateBallotBody = Partial<IBallot>;
