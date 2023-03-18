import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import dayjs from "dayjs";

import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
    const dayAdd24Hours = dayjs().add(2, "day").toDate();

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory,
            dayjsDateProvider,
            carsRepositoryInMemory
        );
    });

    it("should be able to create a new rental", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Name Car",
            description: "Desc Car",
            daily_rate: 130,
            license_plate: "QWE-1234",
            fine_amount: 64,
            brand: "Brand Car",
            category_id: "Category Car",
        });

        const rental = await createRentalUseCase.execute({
            user_id: "123414",
            car_id: car.id,
            expected_return_date: dayAdd24Hours,
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("should not to be able to create a new rental when user already have an active rental", async () => {
        const car1 = await carsRepositoryInMemory.create({
            name: "Name Car",
            description: "Desc Car",
            daily_rate: 130,
            license_plate: "QWE-1234",
            fine_amount: 64,
            brand: "Brand Car",
            category_id: "Category Car",
        });
        const car2 = await carsRepositoryInMemory.create({
            name: "Name Car",
            description: "Desc Car",
            daily_rate: 130,
            license_plate: "QWE-1234",
            fine_amount: 64,
            brand: "Brand Car",
            category_id: "Category Car",
        });

        await createRentalUseCase.execute({
            user_id: "123",
            car_id: car1.id,
            expected_return_date: dayAdd24Hours,
        });

        await expect(
            createRentalUseCase.execute({
                user_id: "123",
                car_id: car2.id,
                expected_return_date: dayAdd24Hours,
            })
        ).rejects.toEqual(new AppError("User is already renting a car"));
    });

    it("should not to be able to create a new rental when car already have an active rental", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Name Car",
            description: "Desc Car",
            daily_rate: 130,
            license_plate: "QWE-1234",
            fine_amount: 64,
            brand: "Brand Car",
            category_id: "Category Car",
        });

        await createRentalUseCase.execute({
            user_id: "124523",
            car_id: car.id,
            expected_return_date: dayAdd24Hours,
        });

        await expect(
            createRentalUseCase.execute({
                user_id: "1234123314",
                car_id: car.id,
                expected_return_date: dayAdd24Hours,
            })
        ).rejects.toEqual(new AppError("Car is not available for rental"));
    });

    it("should not to be able to create a new rental when expected date is less than 24 hours", async () => {
        await expect(
            createRentalUseCase.execute({
                user_id: "323231",
                car_id: "44432324",
                expected_return_date: dayjs().toDate(),
            })
        ).rejects.toEqual(new AppError("Rental has to be more than one day"));
    });

    it("should change availability to false when rent occur", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Name Car",
            description: "Desc Car",
            daily_rate: 130,
            license_plate: "QWE-1234",
            fine_amount: 64,
            brand: "Brand Car",
            category_id: "Category Car",
        });

        await createRentalUseCase.execute({
            user_id: "123414",
            car_id: car.id,
            expected_return_date: dayAdd24Hours,
        });

        const isCarAvailableFind = await carsRepositoryInMemory.find(
            {
                id: car.id,
            },
            false
        );

        const isCarAvailable = isCarAvailableFind.shift();

        expect(isCarAvailable.available).toEqual(false);
    });
});
