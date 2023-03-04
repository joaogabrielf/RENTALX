import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { IFilterListDTO } from "@modules/cars/dtos/IFilterListDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Brackets, Repository } from "typeorm";

import { AppDataSource } from "@shared/infra/typeorm/data-source";

import { Car } from "../entities/Car";

export class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>;

    constructor() {
        this.repository = AppDataSource.getRepository(Car);
    }

    async create({
        brand,
        category_id,
        daily_rate,
        description,
        fine_amount,
        license_plate,
        name,
    }: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            brand,
            category_id,
            daily_rate,
            description,
            fine_amount,
            license_plate,
            name,
        });

        await this.repository.save(car);

        return car;
    }
    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOneBy({ license_plate });

        return car;
    }

    async find(
        filterBy: IFilterListDTO,
        orderBy?: string,
        onlyAvailable = true
    ): Promise<Car[]> {
        const { brand, category_id, name } = filterBy;
        const carsQuery = this.repository
            .createQueryBuilder("c")
            .where("available= :available", { available: true });

        if (onlyAvailable !== true) {
            carsQuery.orWhere("available= :available", { available: false });
        }

        if (brand) carsQuery.andWhere("brand=:brand", { brand });

        if (name) carsQuery.andWhere("name=:name", { name });

        if (category_id)
            carsQuery.andWhere("category_id=:category_id", { category_id });

        if (orderBy) {
            carsQuery.orderBy(orderBy);
        }

        const cars = await carsQuery.getMany();

        return cars;
    }
}
