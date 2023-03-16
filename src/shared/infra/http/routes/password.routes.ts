import { ResetPasswordUserController } from "@modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController";
import { SendMailForgotPasswordController } from "@modules/accounts/useCases/sendMailForgotPassword/SendMailForgotPasswordController";
import { Router } from "express";

export const passwordRoutes = Router();

const sendMailForgotPasswordController = new SendMailForgotPasswordController();
const resetPasswordUserController = new ResetPasswordUserController();

passwordRoutes.post("/forgot", sendMailForgotPasswordController.handle);
passwordRoutes.post("/reset", resetPasswordUserController.handle);
