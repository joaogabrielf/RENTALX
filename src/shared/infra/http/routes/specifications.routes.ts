import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ListSpecificationController } from "@modules/cars/useCases/listSpecification/ListSpecificationController";
import { Router } from "express";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticaded } from "../middlewares/ensureAuthenticaded";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationController();

specificationsRoutes.post(
    "/",
    ensureAuthenticaded,
    ensureAdmin,
    createSpecificationController.handle
);

specificationsRoutes.get("/", listSpecificationController.handle);

export { specificationsRoutes };
