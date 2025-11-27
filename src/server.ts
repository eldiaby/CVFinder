import "./config/env";
import { app } from "./app";
import { connectDB } from "./config/database";

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
	await connectDB();
	console.log(`Server running on port ${PORT}...`);
});
