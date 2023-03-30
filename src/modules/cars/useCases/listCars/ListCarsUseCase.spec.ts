import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListCarsUseCase } from "./ListCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
    });

    it("should be able to list all available cars", async () => {
        const car1 = await carsRepositoryInMemory.create({
            name: "Car1",
            description: "Car1 description",
            daily_rate: 140.0,
            license_plate: "XXX-1234",
            fine_amount: 40.0,
            brand: "Car1_brand",
            category_id: "category_id",
        });
        const car2 = await carsRepositoryInMemory.create({
            name: "Car2",
            description: "Car2 description",
            daily_rate: 130.0,
            license_plate: "XXX-1334",
            fine_amount: 50.0,
            brand: "Car2_brand",
            category_id: "category2_id",
        });
        const cars = await listCarsUseCase.execute({});

        expect(cars).toEqual([car1, car2]);
    });

    it("should be able to list all available cars by name", async () => {
        const car1 = await carsRepositoryInMemory.create({
            name: "Car1",
            description: "Car1 description",
            daily_rate: 140.0,
            license_plate: "XXX-1234",
            fine_amount: 40.0,
            brand: "Car1_brand_test",
            category_id: "category_id",
        });
        const cars = await listCarsUseCase.execute({
            name: "Car1",
        });
        expect(cars).toEqual([car1]);
    });

    it("should be able to list all available cars by category", async () => {
        const car1 = await carsRepositoryInMemory.create({
            name: "Car1",
            description: "Car1 description",
            daily_rate: 140.0,
            license_plate: "XXX-1234",
            fine_amount: 40.0,
            brand: "Car1_brand_test",
            category_id: "category_id",
        });
        const cars = await listCarsUseCase.execute({
            category_id: "category_id",
        });
        expect(cars).toEqual([car1]);
    });

    it("should be able to list all available cars by brand", async () => {
        const car1 = await carsRepositoryInMemory.create({
            name: "Car1",
            description: "Car1 description",
            daily_rate: 140.0,
            license_plate: "XXX-1234",
            fine_amount: 40.0,
            brand: "Car1_brand_test",
            category_id: "category_id",
        });
        const cars = await listCarsUseCase.execute({
            brand: "Car1_brand_test",
        });
        expect(cars).toEqual([car1]);
    });
});
