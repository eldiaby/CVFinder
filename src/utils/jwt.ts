import { sign, verify } from "jsonwebtoken";

interface JwtPayload {
	Id: string;
}

const getJwtSecret = (): string => {
	const jwtSecret = process.env.JWT_SECRET;

	if (!jwtSecret) {
		throw new Error("JWT_SECRET environment variable is not set");
	}

	return jwtSecret;
};

export const generateJwtToken = (payload: JwtPayload): string => {
	const jwtSecret = getJwtSecret();
	return sign(payload, jwtSecret);
};

export const verifyJwtToken = (token: string) => {
	const jwtSecret = getJwtSecret();
	return verify(token, jwtSecret);
};
