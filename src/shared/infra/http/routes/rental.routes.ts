import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { Router } from "express";

import { ensureAuthenticaded } from "../middlewares/ensureAuthenticaded";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();

rentalRoutes.post("/", ensureAuthenticaded, createRentalController.handle);

export { rentalRoutes };
