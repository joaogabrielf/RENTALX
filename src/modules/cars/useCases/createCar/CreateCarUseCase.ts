import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

interface IRequest {
    name: string;
    description: string;
    daily_rate: number;
    license_plate: string;
    fine_amount: number;
    brand: string;
    category_id: string;
}

@injectable()
export class CreateCarUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
    ) {}

    async execute({
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
    }: IRequest): Promise<Car> {
        const carAlreadyExistsSearch = await this.carsRepository.find({
            license_plate,
        });

        const carAlreadyExists = carAlreadyExistsSearch?.length;

        if (carAlreadyExists) {
            throw new AppError("Car already exists");
        }

        const categoryExists = await this.categoriesRepository.findById(
            category_id
        );

        if (!categoryExists) {
            throw new AppError("Category not found");
        }

        const car = await this.carsRepository.create({
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
        });

        return car;
    }
}
