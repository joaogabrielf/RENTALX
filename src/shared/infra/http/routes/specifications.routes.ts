import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { Router } from "express";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticaded } from "../middlewares/ensureAuthenticaded";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post(
    "/",
    ensureAuthenticaded,
    ensureAdmin,
    createSpecificationController.handle
);

export { specificationsRoutes };
