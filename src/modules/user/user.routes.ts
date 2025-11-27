import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

router.get("/", userController.getAll);
router.get("/:id", userController.getOne);
router.post("/", userController.create);
router.put("/:id", userController.update);
router.delete("/:id", userController.remove);

export default router;
