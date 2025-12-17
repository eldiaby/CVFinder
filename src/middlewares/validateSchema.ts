import type { NextFunction, Request, Response } from "express";
import { ZodError, type ZodTypeAny } from "zod/v3";

export function validateSchema<T extends ZodTypeAny>(schema: T) {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse(req.body);
			next();
		} catch (err) {
			if (err instanceof ZodError) {
				const zodErr = err as ZodError<any>;
				const errors = zodErr.errors.map((e) => ({
					path: e.path.join("."),
					message: e.message,
				}));
				return res.status(400).json({ errors });
			}
			next(err);
		}
	};
}
