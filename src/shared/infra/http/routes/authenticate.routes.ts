import { AuthenticaUserController } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserController";
import { Router } from "express";

export const authenticateRoutes = Router();

const authenticaUserController = new AuthenticaUserController();

authenticateRoutes.post("/sessions", authenticaUserController.handle);
