import { Router } from "express";

import { ensureAuthenticaded } from "../middlewares/ensureAuthenticaded";
import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.use(ensureAuthenticaded);
specificationsRoutes.post("/", createSpecificationController.handle);

export { specificationsRoutes };
