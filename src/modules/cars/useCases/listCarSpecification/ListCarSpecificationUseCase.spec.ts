import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "../createCarSpecification/CreateCarSpecificationUseCase";
import { ListCarSpecificationUseCase } from "./ListCarSpecificationUseCase";

let listCarSpecificationUseCase: ListCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe("List Car's specifications", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationsRepositoryInMemory =
            new SpecificationsRepositoryInMemory();
        listCarSpecificationUseCase = new ListCarSpecificationUseCase(
            carsRepositoryInMemory
        );
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepositoryInMemory,
            specificationsRepositoryInMemory
        );
    });

    it("should not be able to list specifications from not existing car", async () => {
        const car_id = "123123123";
        await expect(
            listCarSpecificationUseCase.execute(car_id)
        ).rejects.toEqual(new AppError("Car does not exists"));
    });

    it("should be able to list all car's specifications", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Name Car Specification",
            description: "Desc Car Specification",
            daily_rate: 110,
            license_plate: "QRE-1434",
            fine_amount: 24,
            brand: "Brand Car Specification",
            category_id: "Category Car Specification",
        });
        const specification1 = await specificationsRepositoryInMemory.create({
            name: "name Test",
            description: "Desc Test",
        });

        const specification2 = await specificationsRepositoryInMemory.create({
            name: "name2 Test2",
            description: "Desc2 Test2",
        });

        const specifications_id = [specification1.id, specification2.id];

        await createCarSpecificationUseCase.execute({
            car_id: car.id,
            specifications_id,
        });

        const specifications = await listCarSpecificationUseCase.execute(
            car.id
        );

        expect(specifications).toEqual([specification1, specification2]);
    });
});
