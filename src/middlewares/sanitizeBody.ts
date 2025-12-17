import type { NextFunction, Request, Response } from "express";

export const filterRequestBody =
	<T extends string>(...allowedFields: T[]) =>
	(req: Request, _: Response, next: NextFunction) => {
		if (!req.body || typeof req.body !== "object") return next();

		req.body = Object.fromEntries(
			Object.entries(req.body).filter(([key]) =>
				allowedFields.includes(key as T),
			),
		) as Pick<typeof req.body, T>;

		next();
	};
