import { Document, Model } from 'mongoose';
import { IStockDoc } from '../stocks/stock.interfaces';
import { IUserDoc } from '../users/user.interfaces';

/**
 * Interface that defines properties in a fund
 *
 * @export
 * @interface IFund
 */
export interface IFund {
	name: string;
	assets: IStockDoc[];
}

/**
 * Interface that defines properties in a UserFund
 *
 * @export
 * @interface IUserFund
 */
export interface IUserFund {
	user: IUserDoc;
	fund: IFundDoc;
	initialValue: number;
	value: number;
	active: boolean;
}

/**
 * Interface that adds a Fund to a MongoDB document
 *
 * @export
 * @interface IFundDoc
 * @extends {IFund}
 * @extends {Document}
 */
export interface IFundDoc extends IFund, Document {}

/**
 * Interface that adds a UserFund to a MongoDB document
 *
 * @export
 * @interface IUserFundDoc
 * @extends {IUserFund}
 * @extends {Document}
 */
export interface IUserFundDoc extends IUserFund, Document {}

/**
 * Interface that creates a model for Fund
 *
 * @export
 * @interface IFundModel
 * @extends {Model<IFundDoc>}
 */
export interface IFundModel extends Model<IFundDoc> {}

/**
 * Interface that creates a model for UserFund
 *
 * @export
 * @interface IUserFundModel
 * @extends {Model<IUserFundDoc>}
 */
export interface IUserFundModel extends Model<IUserFundDoc> {}

export type UpdateFundBody = Partial<IFund>;

export type UpdateUserFundBody = Partial<IUserFund>;
