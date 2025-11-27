export interface IUser {
	name: string;
	email?: string;
	password: string;
	role: "admin" | "lawyer" | "client";
	phone?: number;
	isActive: boolean;
	barNumber?: string;
	barDegree?: string;
}
