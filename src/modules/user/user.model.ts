import mongoose from "mongoose";
import type { IUser } from "../../@types/user.type";

const userSchema = new mongoose.Schema<IUser>(
	{
		name: {
			type: String,
			required: [true, "Name is required"],
			trim: true,
		},
		// email: {
		// 	type: String,
		// 	required: [true, "Email is required"],
		// 	unique: true,
		// 	lowercase: true,
		// },
		password: {
			type: String,
			required: [true, "Password is required"],
			minlength: [6, "Password must be at least 6 characters long"],
		},
		role: {
			type: String,
			enum: {
				values: ["admin", "lawyer", "client"],
				message: "Role must be one of: admin, lawyer, or client",
			},
			default: "client",
		},
		phone: {
			type: String,
			required: false,
			validate: {
				validator: (v: string) => /^(\+?\d{10,15})$/.test(v),
				message: "Invalid phone number format",
			},
		},
		isActive: {
			type: Boolean,
			default: false,
		},

		// Lawyer-specific fields
		barNumber: {
			type: String,
			required: function (): boolean {
				return this.role === "lawyer";
			},
			trim: true,
			validate: {
				validator: function (v: string) {
					if (this.role === "lawyer") {
						return /^\d{6}$/.test(v);
					}
					return true;
				},
				message: "Invalid bar number format",
			},
		},
		barDegree: {
			type: String,
			required: function (): boolean {
				return this.role === "lawyer";
			},
			enum: {
				values: ["Trainee", "Primary", "Appeal", "Cassation"],
				message:
					"Bar degree must be one of: Trainee, Primary, Appeal, or Cassation",
			},
		},
	},
	{ timestamps: true },
);

export const UserModel = mongoose.model<IUser>("User", userSchema);
