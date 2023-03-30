import mongoose from 'mongoose';
import { customAlphabet } from 'nanoid';
import { roles } from '../../config/roles';
import { paginate } from '../paginate';
import { toJSON } from '../toJSON';
import { IFundDoc, IFundModel } from './fund.interfaces';

const fundSchema = new mongoose.Schema<IFundDoc, IFundModel>(
	{
		name: String,
		assets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Stock' }],
	},
	{ timestamps: true }
);

fundSchema.plugin(toJSON);
fundSchema.plugin(paginate);

export default mongoose.model<IFundDoc, IFundModel>('Fund', fundSchema);
