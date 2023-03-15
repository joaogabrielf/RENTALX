import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { CarsImagesRepository } from "@modules/cars/infra/typeorm/repositories/CarsImagesRepository";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationRepository";
import { RentalsRepository } from "@modules/rentals/infra/typeorm/repositories/RentalsRepository";
import { container } from "tsyringe";
import "@shared/container/providers";

// ICategoriesRepository
container.registerSingleton("CategoriesRepository", CategoriesRepository);

// ISpepcificationRepository
container.registerSingleton("SpecificationRepository", SpecificationRepository);

// IUsersRepository
container.registerSingleton("UsersRepository", UsersRepository);

// ICarsRepository
container.registerSingleton("CarsRepository", CarsRepository);

// ICarsImageRepository
container.registerSingleton("CarsImagesRepository", CarsImagesRepository);

// IRentalsRepository
container.registerSingleton("RentalsRepository", RentalsRepository);

// IUsersTokensRepository
container.registerSingleton("UsersTokensRepository", UsersTokensRepository);
