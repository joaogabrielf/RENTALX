import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { inject, injectable } from "tsyringe";

import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    id: string;
    user_id: string;
}

@injectable()
export class ReturnRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) {}

    async execute({ id, user_id }: IRequest): Promise<Rental> {
        const rental = await this.rentalsRepository.findById(id);

        if (!rental) {
            throw new AppError("Rental does not exists!");
        }

        if (rental.user_id !== user_id) {
            throw new AppError("Invalid user!");
        }

        if (rental.end_date) {
            throw new AppError("Rental has already been returned ");
        }

        const car = (
            await this.carsRepository.find({ id: rental.car_id }, false)
        ).shift();

        const dateNow = this.dateProvider.dateNow();

        const dailyDays = this.dateProvider.compareInDays(
            rental.start_date,
            rental.expected_return_date
        );
        const fareDays = this.dateProvider.compareInDays(
            rental.expected_return_date,
            dateNow
        );

        let total = 0;

        if (fareDays > 0) {
            const fineAmount = fareDays * car.fine_amount;
            total = fineAmount;
        }

        total += dailyDays * car.daily_rate;

        rental.end_date = dateNow;
        rental.total = total;

        await this.rentalsRepository.create(rental);
        await this.carsRepository.updateAvailable(car.id, true);

        return rental;
    }
}
