import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
describe("Create Car", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(
            carsRepositoryInMemory,
            categoriesRepositoryInMemory
        );
    });

    it("should be able to create a new car", async () => {
        const category = {
            name: "Category Test",
            description: "Category description",
        };

        await categoriesRepositoryInMemory.create({
            name: category.name,
            description: category.description,
        });

        const { id: category_id } =
            await categoriesRepositoryInMemory.findByName(category.name);

        const car = await createCarUseCase.execute({
            name: "Name Car",
            description: "Desc Car",
            daily_rate: 130,
            license_plate: "QWE-1234",
            fine_amount: 64,
            brand: "Brand Car",
            category_id,
        });

        expect(car).toHaveProperty("id");
    });

    it("should not be able to create a car with an existing license plate", async () => {
        const category = {
            name: "Category Test",
            description: "Category description",
        };

        await categoriesRepositoryInMemory.create({
            name: category.name,
            description: category.description,
        });

        const { id: category_id } =
            await categoriesRepositoryInMemory.findByName(category.name);
        await createCarUseCase.execute({
            name: "Car1",
            description: "Desc Car1",
            daily_rate: 130,
            license_plate: "QWE-1234",
            fine_amount: 64,
            brand: "Brand Car",
            category_id,
        });
        await expect(
            createCarUseCase.execute({
                name: "Car2",
                description: "Desc Car2",
                daily_rate: 130,
                license_plate: "QWE-1234",
                fine_amount: 64,
                brand: "Brand Car",
                category_id,
            })
        ).rejects.toEqual(new AppError("Car already exists"));
    });

    it("should be able to create a new car with available true by default", async () => {
        const category = {
            name: "Category Test",
            description: "Category description",
        };

        await categoriesRepositoryInMemory.create({
            name: category.name,
            description: category.description,
        });

        const { id: category_id } =
            await categoriesRepositoryInMemory.findByName(category.name);

        const car = await createCarUseCase.execute({
            name: "Available Car",
            description: "Desc Available Car",
            daily_rate: 130,
            license_plate: "QSD-1234",
            fine_amount: 64,
            brand: "Brand Car",
            category_id,
        });

        expect(car.available).toBe(true);
    });

    it("should not be able to create a car with a non existing category", async () => {
        await expect(
            createCarUseCase.execute({
                name: "Car2",
                description: "Desc Car2",
                daily_rate: 130,
                license_plate: "QWE-1234",
                fine_amount: 64,
                brand: "Brand Car",
                category_id: "Category Car",
            })
        ).rejects.toEqual(new AppError("Category not found"));
    });
});
