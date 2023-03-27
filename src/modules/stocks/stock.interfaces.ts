import mongoose, { Document, Model } from 'mongoose';
import { QueryResult } from '../paginate/paginate';

export interface IStock {
	name: string;
	abbreviation: string;
	sector: string;
	price: number;
}

export interface IStockDoc extends IStock, Document {}

export interface IStockModel extends Model<IStockDoc> {
	paginate(
		filter: Record<string, any>,
		options: Record<string, any>
	): Promise<QueryResult>;
}

export type UpdateStockBody = Partial<IStock>;
