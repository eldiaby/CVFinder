import mongoose from "mongoose";

/**
 * Establishes a connection to the MongoDB database using Mongoose.
 *
 * This function reads the MongoDB connection string from the environment
 * variables and replaces placeholder values (if present) with the actual
 * project name and password defined in the environment.
 *
 * Environment variables required:
 *   - MONGO_URI: The MongoDB connection string template, which may include
 *     placeholders such as <PROJECT_NAME> and <MONGO_PASSWORD>.
 *   - PROJECT_NAME: The project or database name to replace <PROJECT_NAME>.
 *   - MONGO_PASSWORD: The password to replace <MONGO_PASSWORD>.
 *
 * If any of these variables are missing, the function will log an error
 * message and terminate the process to prevent the application from running
 * without a valid database connection.
 *
 * Example:
 *   MONGO_URI="mongodb+srv://<PROJECT_NAME>:<MONGO_PASSWORD>@cluster.mongodb.net"
 *   PROJECT_NAME="law-app"
 *   MONGO_PASSWORD="secret123"
 *
 * Behavior:
 *   - The function replaces placeholders in the URI with real values.
 *   - It attempts to connect to MongoDB using the final connection string.
 *   - On success, it logs a success message.
 *   - On failure, it logs the error and exits the process with code 1.
 */
export const connectDB = async (): Promise<void> => {
	const { MONGO_URI, PROJECT_NAME, MONGO_PASSWORD } = process.env;

	// Validate environment variables
	if (!MONGO_URI) {
		console.error("Error: MONGO_URI is not defined in environment variables.");
		process.exit(1);
	}

	// Replace placeholders in the URI if applicable
	const mongoUri = MONGO_URI.replace(
		"<PROJECT_NAME>",
		PROJECT_NAME ?? "<PROJECT_NAME>",
	).replace("<MONGO_PASSWORD>", MONGO_PASSWORD ?? "<MONGO_PASSWORD>");

	try {
		await mongoose.connect(mongoUri);
		console.log("MongoDB Connected...");
	} catch (err) {
		console.error("MongoDB Connection Failed:", err);
		process.exit(1);
	}
};
