import type { Document } from "mongoose";

export enum UserRole {
	ADMIN = `admin`,
	USER = `user`,
	HR = `HR`,
}

export interface IUser {
	name: string;
	email: string;
	password: string;
	passwordConfirm?: string;
	role: UserRole;
	CV?: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface IUserDocument extends IUser, Document {
	comparePassword: (arg: string) => boolean;
}
