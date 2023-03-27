import mongoose, { ConnectOptions, Mongoose } from 'mongoose';

const uri: string | undefined = process.env.MONGODB_URI;

if (!uri) {
	throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

let cached = globalThis.mongoose;

if (!cached) {
	cached = globalThis.mongoose = { conn: null, promise: null };
}

async function dbConnect(): Promise<Mongoose> {
	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		const opts: ConnectOptions = {
			dbName: 'IndexFundAssessment',
			bufferCommands: false,
		};

		if (uri === undefined) {
			throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
		}

		cached.promise = mongoose.connect(uri, opts).then((mongoose) => {
			return mongoose;
		});
	}
	try {
		cached.conn = await cached.promise;
	} catch (e) {
		cached.promise = null;
		throw e;
	}
	return cached.conn;
}

export default dbConnect;
