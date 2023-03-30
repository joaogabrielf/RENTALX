import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

interface IRequest {
    car_id: string;
    specifications_id: string[];
}

@injectable()
export class CreateCarSpecificationUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,

        @inject("SpecificationRepository")
        private specificationsRepository: ISpecificationRepository
    ) {}

    async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
        const carExists = (
            await this.carsRepository.find({
                id: car_id,
            })
        ).shift();

        if (!carExists) {
            throw new AppError("Car does not exists");
        }

        const specifications = await this.specificationsRepository.find({
            ids: specifications_id,
        });

        carExists.specifications =
            (await this.carsRepository.findAllSpecifications(carExists.id)) ??
            [];

        carExists.specifications.push(...specifications);

        const carInserted = await this.carsRepository.create(carExists);

        return carInserted;
    }
}
