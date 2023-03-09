import uploadConfig from "@config/upload";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecififcationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListCarsController } from "@modules/cars/useCases/listCars/ListCarsController";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImages/UploadCarImagesController";
import { Router } from "express";
import multer from "multer";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticaded } from "../middlewares/ensureAuthenticaded";

const carsRoutes = Router();

const uploadCar = multer(uploadConfig.upload("./tmp/cars"));

const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();
const createCarSpecififcationController =
    new CreateCarSpecififcationController();
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

carsRoutes.post(
    "/images/:id",
    ensureAuthenticaded,
    ensureAdmin,
    uploadCar.array("images"),
    uploadCarImagesController.handle
);

export { carsRoutes };
