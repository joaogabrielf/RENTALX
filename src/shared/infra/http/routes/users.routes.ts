import uploadConfig from "@config/upload";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { ProfileUserController } from "@modules/cars/useCases/profileUserUseCase/ProfileUserController";
import { Router } from "express";
import multer from "multer";

import { ensureAuthenticaded } from "../middlewares/ensureAuthenticaded";

export const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.patch(
    "/avatar",
    ensureAuthenticaded,
    uploadAvatar.single("avatar"),
    updateUserAvatarController.handle
);

usersRoutes.get("/profile", ensureAuthenticaded, profileUserController.handle);
