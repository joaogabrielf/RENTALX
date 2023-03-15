import { AuthenticaUserController } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserController";
import { RefreshTokenController } from "@modules/accounts/useCases/refreshToken/RefreshTokenController";
import { Router } from "express";

export const authenticateRoutes = Router();

const authenticaUserController = new AuthenticaUserController();
const refreshTokenController = new RefreshTokenController();

authenticateRoutes.post("/sessions", authenticaUserController.handle);
authenticateRoutes.post("/refresh-token", refreshTokenController.handle);
