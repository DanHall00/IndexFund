import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { paginate } from '../paginate';
import { toJSON } from '../toJSON';
import { IStockDoc, IStockModel } from './stock.interfaces';

const stockSchema = new mongoose.Schema<IStockDoc>(
	{
		name: String,
		abbreviation: String,
		sector: String,
		price: Number,
	},
	{ timestamps: true }
);

stockSchema.plugin(toJSON);
stockSchema.plugin(paginate);

export default mongoose.models.Stock ||
	mongoose.model<IStockDoc, IStockModel>('Stock', stockSchema);
