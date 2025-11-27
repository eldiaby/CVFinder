import type { Response } from "express";

export enum ResponseStatus {
	SUCCESS = "success",
	FAIL = "fail",
	ERROR = "error",
}

export interface MetaData {
	length?: number;
	timestamp?: string;
	[key: string]: any;
}

export interface SendResponseOptions<T = unknown> {
	statusCode?: number;
	message?: string;
	data?: T | T[] | null;
	meta?: MetaData;
	status?: ResponseStatus;
}

const sendResponse = <T = unknown>(
	res: Response,
	options: SendResponseOptions<T> = {},
) => {
	let {
		statusCode = 200,
		message = "",
		data = null,
		meta = {},
		status,
	} = options;

	if (!status) {
		if (statusCode >= 200 && statusCode < 300) status = ResponseStatus.SUCCESS;
		else if (statusCode >= 400 && statusCode < 500)
			status = ResponseStatus.FAIL;
		else status = ResponseStatus.ERROR;
	}

	if (Array.isArray(data)) {
		meta.length = data.length;
	}

	meta.timestamp = new Date().toISOString();

	const responseBody = {
		statusCode,
		status,
		message,
		meta,
		data,
	};

	return res.status(statusCode).json(responseBody);
};

export default sendResponse;
