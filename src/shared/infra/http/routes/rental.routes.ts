import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { ListRentalsByUserController } from "@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController";
import { ReturnRentalController } from "@modules/rentals/useCases/returnRental/ReturnRentalController";
import { Router } from "express";

import { ensureAuthenticaded } from "../middlewares/ensureAuthenticaded";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const returnRentalController = new ReturnRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalRoutes.post("/", ensureAuthenticaded, createRentalController.handle);
rentalRoutes.post(
    "/return/:id",
    ensureAuthenticaded,
    returnRentalController.handle
);

rentalRoutes.get(
    "/user",
    ensureAuthenticaded,
    listRentalsByUserController.handle
);

export { rentalRoutes };
