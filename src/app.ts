import compression from "compression";
import express from "express";
import pino from "pino";
import pinoHttp from "pino-http";

import { UserModule } from "./modules/user/user.module";

export const app = express();

app.use(express.json());
app.use(compression());

// Logger only in development
if (process.env.NODE_ENV === "development") {
	const logger = pino({
		transport:
			process.env.NODE_ENV === "development"
				? {
						target: "pino-pretty",
						options: { colorize: true, translateTime: "SYS:standard" },
					}
				: undefined,
	});

	app.use(pinoHttp({ logger }));
}

app.use(`/api/v1/users`, UserModule.router);

app.get("/", (_, res) => res.send("API is running..."));
