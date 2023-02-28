import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { Router } from "express";

import { ensureAuthenticaded } from "../middlewares/ensureAuthenticaded";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.use(ensureAuthenticaded);
specificationsRoutes.post("/", createSpecificationController.handle);

export { specificationsRoutes };
