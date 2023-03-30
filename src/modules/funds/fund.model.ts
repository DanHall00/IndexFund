import mongoose from 'mongoose';
import { toJSON } from '../toJSON';
import { IFundDoc, IFundModel } from './fund.interfaces';

/*
 * ----------------------------------------------------------------------------------
 * FUND SCHEMA
 * ----------------------------------------------------------------------------------
 */
const fundSchema = new mongoose.Schema<IFundDoc, IFundModel>(
	{
		name: String,
		assets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Stock' }],
	},
	{ timestamps: true }
);

fundSchema.plugin(toJSON);

export default mongoose.models.Fund ||
	mongoose.model<IFundDoc, IFundModel>('Fund', fundSchema);
