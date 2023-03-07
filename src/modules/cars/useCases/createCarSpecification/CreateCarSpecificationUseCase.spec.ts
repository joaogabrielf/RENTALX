import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create Car Specification", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationsRepositoryInMemory =
            new SpecificationsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepositoryInMemory,
            specificationsRepositoryInMemory
        );
    });

    it("should not be able to add a specification to a nonexistent car", async () => {
        expect(async () => {
            const car_id = "12344";
            const specifications_id = ["123123123"];

            await createCarSpecificationUseCase.execute({
                car_id,
                specifications_id,
            });
        });
    });

    it("should be able to add a specification to a new car", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Name Car Specification",
            description: "Desc Car Specification",
            daily_rate: 110,
            license_plate: "QRE-1434",
            fine_amount: 24,
            brand: "Brand Car Specification",
            category_id: "Category Car Specification",
        });
        const specification = await specificationsRepositoryInMemory.create({
            name: "name Test",
            description: "Desc Test",
        });

        await specificationsRepositoryInMemory.create({
            name: "name2 Test2",
            description: "Desc2 Test2",
        });

        const specifications_id = [specification.id];

        const specificationCar = await createCarSpecificationUseCase.execute({
            car_id: car.id,
            specifications_id,
        });

        expect(specificationCar).toHaveProperty("specifications");
        expect(specificationCar.specifications.length).toBe(1);
    });
});
