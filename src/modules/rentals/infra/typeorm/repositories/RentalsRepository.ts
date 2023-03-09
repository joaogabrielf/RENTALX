import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { Repository } from "typeorm";

import { AppDataSource } from "@shared/infra/typeorm/data-source";

import { Rental } from "../entities/Rental";

export class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>;

    constructor() {
        this.repository = AppDataSource.getRepository(Rental);
    }

    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        const openRentalByCar = await this.repository.findOneBy({ car_id });
        return openRentalByCar;
    }
    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        const openRentalByUser = await this.repository.findOneBy({ user_id });
        return openRentalByUser;
    }
    async create({
        car_id,
        expected_return_date,
        user_id,
    }: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({
            car_id,
            expected_return_date,
            user_id,
        });
        await this.repository.save(rental);
        return rental;
    }
}
