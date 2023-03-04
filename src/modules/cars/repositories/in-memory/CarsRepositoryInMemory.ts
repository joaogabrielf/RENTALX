import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { IFilterListDTO } from "@modules/cars/dtos/IFilterListDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { v4 as uuidv4 } from "uuid";

import { ICarsRepository } from "../ICarsRepository";

export class CarsRepositoryInMemory implements ICarsRepository {
    cars: Car[] = [];

    async create({
        brand,
        category_id,
        daily_rate,
        description,
        fine_amount,
        name,
        license_plate,
    }: ICreateCarDTO): Promise<Car> {
        const car = new Car();

        Object.assign(car, {
            id: uuidv4(),
            brand,
            category_id,
            daily_rate,
            available: true,
            description,
            fine_amount,
            name,
            license_plate,
            created_at: new Date(),
        });

        this.cars.push(car);
        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find((car) => car.license_plate === license_plate);
    }

    async find(
        filterBy: IFilterListDTO,
        orderBy = "name",
        onlyAvailable = true
    ): Promise<Car[]> {
        const compareOrder = (a: Car, b: Car) => {
            if (a[orderBy] < b[orderBy]) {
                return -1;
            }
            if (a[orderBy] > b[orderBy]) {
                return 1;
            }
            return 0;
        };

        const { brand, category_id, name } = filterBy;
        const isEmpty = !Object.values(filterBy).some((x) => x !== undefined);

        return this.cars
            .filter((car) =>
                onlyAvailable
                    ? car.available === true &&
                      ((brand && car.brand === brand) ||
                          (category_id && car.category_id === category_id) ||
                          (name && car.name === name) ||
                          isEmpty)
                    : true
            )
            .sort(compareOrder);
    }
}
