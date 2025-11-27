import router from "./user.routes";
import { userService } from "./user.service";
import { userController } from "./user.controller";
import { userRepository } from "./user.repository";
import { UserModel } from "./user.model";

export const UserModule = {
	router,
	model: UserModel,
	repository: userRepository,
	service: userService,
	controller: userController,
};
