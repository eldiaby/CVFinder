import type { Document } from "mongoose";

export interface IUser extends Document {
	name: string;
	email: string;
	password: string;
	passwordConfirm?: string;
	role: "user" | "HR";
	createdAt?: Date;
	updatedAt?: Date;
}
