import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IsNull, Repository } from "typeorm";

import { AppDataSource } from "@shared/infra/typeorm/data-source";

import { Rental } from "../entities/Rental";

export class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>;

    constructor() {
        this.repository = AppDataSource.getRepository(Rental);
    }

    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        const openRentalByCar = await this.repository.findOneBy({
            car_id,
            end_date: IsNull(),
        });
        return openRentalByCar;
    }
    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        const openRentalByUser = await this.repository.findOneBy({
            user_id,
            end_date: IsNull(),
        });
        return openRentalByUser;
    }
    async create({
        car_id,
        expected_return_date,
        user_id,
        id,
        end_date,
        total,
    }: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({
            car_id,
            expected_return_date,
            user_id,
            id,
            end_date,
            total,
        });
        await this.repository.save(rental);
        return rental;
    }

    async findById(id: string): Promise<Rental> {
        const rental = await this.repository.findOneBy({ id });
        return rental;
    }

    async findByUser(user_id: string): Promise<Rental[]> {
        // const rental = await this.repository.findBy(Car, { user_id });
        const rental = await this.repository.find({
            where: { user_id },
            relations: ["car"],
        });
        return rental;
    }
}
