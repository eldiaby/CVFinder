import type { Request, Response } from "express";
import apiResponse from "./../../utils/apiResponse";
import { userService } from "./user.service";

export const userController = {
	async getAll(_: Request, res: Response) {
		try {
			const users = await userService.getAllUsers();
			apiResponse(res, { data: users, message: "All Users" });
			// res.json(users);
		} catch (err) {
			if (err instanceof Error) {
				res.status(500).json({ message: err.message });
			} else {
				res.status(500).json({ message: "Unexpected error" });
			}
		}
	},

	async getOne(req: Request, res: Response) {
		try {
			const user = await userService.getUserById(req.params.id);
			res.json(user);
		} catch (err) {
			if (err instanceof Error) {
				res.status(404).json({ message: err.message });
			} else {
				res.status(404).json({ message: "Unexpected error" });
			}
		}
	},

	async create(req: Request, res: Response) {
		try {
			const newUser = await userService.createUser(req.body);
			res.status(201).json(newUser);
		} catch (err) {
			if (err instanceof Error) {
				res.status(400).json({ message: err.message });
			} else {
				res.status(400).json({ message: "Unexpected error" });
			}
		}
	},

	async update(req: Request, res: Response) {
		try {
			const user = await userService.updateUser(req.params.id, req.body);
			res.json(user);
		} catch (err) {
			if (err instanceof Error) {
				res.status(400).json({ message: err.message });
			} else {
				res.status(400).json({ message: "Unexpected error" });
			}
		}
	},

	async remove(req: Request, res: Response) {
		try {
			const user = await userService.deleteUser(req.params.id);
			res.json({ message: "User deleted", user });
		} catch (err) {
			if (err instanceof Error) {
				res.status(404).json({ message: err.message });
			} else {
				res.status(404).json({ message: "Unexpected error" });
			}
		}
	},
};
