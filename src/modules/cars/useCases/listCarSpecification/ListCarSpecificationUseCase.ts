import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class ListCarSpecificationUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) {}
    async execute(car_id: string) {
        const carExists = (
            await this.carsRepository.find({
                id: car_id,
            })
        ).shift();

        if (!carExists) {
            throw new AppError("Car does not exists");
        }

        const cars = await this.carsRepository.findAllSpecifications(
            carExists.id
        );

        return cars;
    }
}
