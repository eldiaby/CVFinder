import { beforeAll, afterAll, afterEach } from "vitest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import net from "net";

let mongo: MongoMemoryServer | null = null;

async function isMongoRunning(host = "127.0.0.1", port = 27017): Promise<boolean> {
	return new Promise((resolve) => {
		const socket = new net.Socket();
		socket
			.setTimeout(1000)
			.once("error", () => resolve(false))
			.once("timeout", () => resolve(false))
			.connect(port, host, () => {
				socket.end();
				resolve(true);
			});
	});
}

beforeAll(async () => {
	const localMongo = await isMongoRunning();

	if (localMongo) {
		console.log("Using local MongoDB instance...");
		await mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.PROJECT_NAME || ``}-testdb`);
	} else {
		console.log("Starting in-memory MongoDB...");
		mongo = await MongoMemoryServer.create();
		const uri = mongo.getUri();
		await mongoose.connect(uri);
	}
});

afterEach(async () => {
const collections = await mongoose.connection.db?.collections() ?? [];
	for (const collection of collections) {
		await collection.deleteMany({});
	}
});

afterAll(async () => {
	await mongoose.connection.dropDatabase();
	await mongoose.connection.close();

	if (mongo) {
		await mongo.stop();
	}
});
