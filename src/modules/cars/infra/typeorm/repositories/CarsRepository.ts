import { ICarFilterListDTO } from "@modules/cars/dtos/ICarFilterListDTO";
import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Repository } from "typeorm";

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
        specifications,
        id,
    }: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            brand,
            category_id,
            daily_rate,
            description,
            fine_amount,
            license_plate,
            name,
            specifications,
            id,
        });

        await this.repository.save(car);

        return car;
    }
    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOneBy({ license_plate });

        return car;
    }

    async find(
        filterBy: ICarFilterListDTO,
        onlyAvailable = true,
        orderBy = "name"
    ): Promise<Car[]> {
        const { id, brand, category_id, name, license_plate } = filterBy;
        const carsQuery = this.repository
            .createQueryBuilder("c")
            .where("available= :available", { available: true });

        if (onlyAvailable !== true) {
            carsQuery.orWhere("available= :available", { available: false });
        }

        if (id) carsQuery.andWhere("id=:id", { id });

        if (license_plate)
            carsQuery.andWhere("license_plate=:license_plate", {
                license_plate,
            });

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

    async updateAvailable(id: string, available: boolean): Promise<void> {
        await this.repository
            .createQueryBuilder()
            .update()
            .set({ available })
            .where("id = :id", { id })
            .execute();
    }
}
