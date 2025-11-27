import type { IUser } from "../../@types/user.type";
import { UserModel } from "./user.model";

export const userRepository = {
	async findAll() {
		return await UserModel.find();
	},

	async findById(id: string) {
		return await UserModel.findById(id);
	},

	async findByEmail(email: string) {
		return await UserModel.findOne({ email });
	},

	async create(data: IUser) {
		const user = new UserModel(data);
		return await user.save();
	},

	async updateById(id: string, data: IUser) {
		return await UserModel.findByIdAndUpdate(id, data, { new: true });
	},

	async deleteById(id: string) {
		return await UserModel.findByIdAndDelete(id);
	},
};
