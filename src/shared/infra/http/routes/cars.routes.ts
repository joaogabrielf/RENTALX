import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecififcationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListCarsController } from "@modules/cars/useCases/listCars/ListCarsController";
import { Router } from "express";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticaded } from "../middlewares/ensureAuthenticaded";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();
const createCarSpecififcationController =
    new CreateCarSpecififcationController();

carsRoutes.post(
    "/",
    ensureAuthenticaded,
    ensureAdmin,
    createCarController.handle
);

carsRoutes.get("/list", listCarsController.handle);

carsRoutes.post(
    "/specifications/:id",
    ensureAuthenticaded,
    ensureAdmin,
    createCarSpecififcationController.handle
);

export { carsRoutes };
