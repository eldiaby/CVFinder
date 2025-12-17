import type { CookieOptions, Response } from "express";

interface SendCookieParams {
	response: Response;
	cookieName: string;
	cookieValue: unknown;
	options?: CookieOptions;
}

const defaultCookieOptions: CookieOptions = {
	httpOnly: process.env.NODE_ENV === "production",
	secure: process.env.NODE_ENV === "production",
	sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
	signed: true,
};

export const sendSignedCookie = ({
	response,
	cookieName,
	cookieValue,
	options,
}: SendCookieParams): void => {
	response.cookie(cookieName, JSON.stringify(cookieValue), {
		...defaultCookieOptions,
		...options, // user options override defaults
	});
};
