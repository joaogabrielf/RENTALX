import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationRepository";
import { container } from "tsyringe";

// ICategoriesRepository
container.registerSingleton("CategoriesRepository", CategoriesRepository);

// ICategoriesRepository
container.registerSingleton("SpecificationRepository", SpecificationRepository);

// ICategoriesRepository
container.registerSingleton("UsersRepository", UsersRepository);

// ICarsRepository
container.registerSingleton("CarsRepository", CarsRepository);
