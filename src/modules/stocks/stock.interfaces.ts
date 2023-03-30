import { Document, Model } from 'mongoose';

export interface IStock {
	name: string;
	abbreviation: string;
	sector: string;
	price: number;
}

export interface IStockDoc extends IStock, Document {}

export interface IStockModel extends Model<IStockDoc> {}

export type UpdateStockBody = Partial<IStock>;
