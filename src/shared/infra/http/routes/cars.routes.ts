import uploadConfig from "@config/upload";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecififcationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListCarsController } from "@modules/cars/useCases/listCars/ListCarsController";
import { ListCarSpecificationController } from "@modules/cars/useCases/listCarSpecification/ListCarSpecificationController";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImages/UploadCarImagesController";
import { Router } from "express";
import multer from "multer";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticaded } from "../middlewares/ensureAuthenticaded";

const carsRoutes = Router();

const uploadCar = multer(uploadConfig);

const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();
const createCarSpecififcationController =
    new CreateCarSpecififcationController();
const listCarSpecificationController = new ListCarSpecificationController();

const uploadCarImagesController = new UploadCarImagesController();

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

carsRoutes.get("/specifications/:id", listCarSpecificationController.handle);

carsRoutes.post(
    "/images/:id",
    ensureAuthenticaded,
    ensureAdmin,
    uploadCar.array("images"),
    uploadCarImagesController.handle
);

export { carsRoutes };
