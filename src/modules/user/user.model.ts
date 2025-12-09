import { hash } from "argon2";
import mongoose from "mongoose";
import {
	type IUser,
	type IUserDocument,
	UserRole,
} from "../../@types/user.type";

const emailRegex = /^[\w.-]+@[\w.-]+\.\w{2,}$/g;
const passwordRegex =
	/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g;

const testRegex = (value: string, type: `email` | "password") =>
	type === "email" ? emailRegex.test(value) : passwordRegex.test(value);

const userSchema = new mongoose.Schema<IUser>(
	{
		name: {
			type: String,
			trim: true,
			required: [true, "User name is a required field"],
			minlength: [3, "User name must be at least 3 characters"],
			maxlength: [30, "User name must be shorter than 30 characters"],
		},

		email: {
			type: String,
			trim: true,
			required: [true, "User email is a required field"],
			minlength: [3, "User email must be at least 3 characters"],
			maxlength: [50, "User email must be shorter than 50 characters"],
			unique: true,
			lowercase: true,
			validate: {
				validator: (value: string) => testRegex(value, "email"),
				message: "Invalid email format",
			},
		},

		password: {
			type: String,
			required: [true, "Password is a required field"],
			trim: true,
			minlength: [8, "Password must be more than 8 characters"],
			maxlength: [50, "Password must be less than 50 characters"],
			validate: {
				validator: (value: string) => testRegex(value, "password"),
				message:
					"Password must contain lowercase, uppercase, number, and special characters",
			},
		},
		passwordConfirm: {
			type: String,
			trim: true,
			minlength: [8, "Password confirm must be more than 8 characters"],
			maxlength: [50, "Password confirm must be less than 50 characters"],
		},
		role: {
			type: String,
			required: true,
			enum: {
				values: Object.values(UserRole),
				message: "User role is not one of the list",
			},
			default: UserRole.USER,
		},
		CV: {
			type: String,
			required: function (): boolean {
				return this.role === UserRole.USER;
			},
		},
	},
	{ timestamps: true },
);

userSchema.pre<IUserDocument>(/save/g, async function () {
	if (this.isModified("password")) return;
	this.password = await hash(this.password);
});

userSchema.pre<IUserDocument>(/save/g, function () {
	if (this.password === this.passwordConfirm) {
		this.passwordConfirm = undefined;
	} else {
		throw new Error(`Password must match password confirm`);
	}
});

export const UserModel = mongoose.model<IUser>("User", userSchema);
