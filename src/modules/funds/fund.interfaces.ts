import mongoose, { Document, Model } from 'mongoose';
import { QueryResult } from '../paginate/paginate';
import { IStockDoc } from '../stocks/stock.interfaces';
import { IUserDoc } from '../users/user.interfaces';

export interface IFund {
	name: string;
	assets: IStockDoc[];
}

export interface IUserFund {
	user: IUserDoc;
	fund: IFundDoc;
	initialValue: number;
	value: number;
	active: boolean;
}

export interface IFundDoc extends IFund, Document {}

export interface IUserFundDoc extends IUserFund, Document {}

export interface IFundModel extends Model<IFundDoc> {
	paginate(
		filter: Record<string, any>,
		options: Record<string, any>
	): Promise<QueryResult>;
}

export interface IUserFundModel extends Model<IUserFundDoc> {
	paginate(
		filter: Record<string, any>,
		options: Record<string, any>
	): Promise<QueryResult>;
}

export type UpdateFundBody = Partial<IFund>;

export type UpdateUserFundBody = Partial<IUserFund>;
