import { ICarFilterListDTO } from "@modules/cars/dtos/ICarFilterListDTO";
import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
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
        specifications,
        id,
    }: ICreateCarDTO): Promise<Car> {
        const car = new Car();

        Object.assign(car, {
            id: id ?? uuidv4(),
            brand,
            category_id,
            daily_rate,
            available: true,
            description,
            fine_amount,
            name,
            license_plate,
            specifications,
            created_at: new Date(),
        });

        this.cars.push(car);
        return car;
    }

    async find(
        filterBy: ICarFilterListDTO,
        onlyAvailable = true,
        orderBy = "name"
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

        const { id, brand, category_id, name, license_plate } = filterBy;
        const isEmpty = !Object.values(filterBy).some((x) => x !== undefined);

        return this.cars
            .filter((car) =>
                onlyAvailable
                    ? car.available === true &&
                      ((brand && car.brand === brand) ||
                          (category_id && car.category_id === category_id) ||
                          (name && car.name === name) ||
                          (id && car.id === id) ||
                          (license_plate &&
                              car.license_plate === license_plate) ||
                          isEmpty)
                    : true
            )
            .sort(compareOrder);
    }

    async updateAvailable(id: string, available: boolean): Promise<void> {
        this.cars.find((car) => car.id === id).available = available;
    }

    async findAllSpecifications(id: string): Promise<Specification[]> {
        const carsArray = this.cars.find((car) => car.id === id);
        return carsArray.specifications;
    }
}
