import { userController } from "./user.controller";
import { UserModel } from "./user.model";
import { userRepository } from "./user.repository";
import router from "./user.routes";
import { userService } from "./user.service";

export const UserModule = {
	router,
	model: UserModel,
	repository: userRepository,
	service: userService,
	controller: userController,
};
