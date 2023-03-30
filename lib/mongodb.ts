import mongoose, { ConnectOptions, Mongoose } from 'mongoose';

// Get mongodb connection string

const uri: string | undefined = process.env.MONGODB_URI;

if (!uri) {
	throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

// Check if there is a cached version of mongoose, create a new version if not.

let cached = globalThis.mongoose;

if (!cached) {
	cached = globalThis.mongoose = { conn: null, promise: null };
}

/**
 * Connect to the database, to be used in API calls
 *
 * @return {*}  {Promise<Mongoose>}
 */
async function dbConnect(): Promise<Mongoose> {
	// If there is a cached connection, use it
	if (cached.conn) {
		return cached.conn;
	}

	// If there isn't a promise pending, start one
	if (!cached.promise) {
		const opts: ConnectOptions = {
			dbName: 'IndexFundAssessment',
		};

		if (uri === undefined) {
			throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
		}

		cached.promise = mongoose.connect(uri, opts).then((mongoose) => {
			return mongoose;
		});
	}
	// Get the connection once the promise is resolved
	try {
		cached.conn = await cached.promise;
	} catch (e) {
		cached.promise = null;
		throw e;
	}
	return cached.conn;
}

export default dbConnect;
