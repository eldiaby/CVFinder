import path from "node:path";
import dotenv from "dotenv";

dotenv.config({
	path: path.resolve(__dirname, "..", "..", `.`, "config.env"),
	override: true,
});

interface EnvVars {
	PORT: number;
	MONGO_URI: string;
	JWT_SECRET: string;
}

const warn = (msg: string) => {
	console.warn(`[env warning]: ${msg}`);
};

const getEnv = (): EnvVars => {
	const { PORT, MONGO_URI, JWT_SECRET } = process.env;

	let port: number;
	if (!PORT) {
		warn("PORT not set. Using default value 3000.");
		port = 3000;
	} else {
		port = Number(PORT);
	}

	if (!MONGO_URI) {
		throw new Error("Missing required environment variable: MONGO_URI");
	}

	if (!JWT_SECRET) {
		throw new Error("Missing required environment variable: JWT_SECRET");
	}

	return {
		PORT: port,
		MONGO_URI,
		JWT_SECRET,
	};
};

export const env = getEnv();
