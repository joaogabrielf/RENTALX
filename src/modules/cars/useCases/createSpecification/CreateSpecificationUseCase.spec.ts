import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";

import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

let createSpecificationUseCase: CreateSpecificationUseCase;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create Specifications", () => {
    beforeEach(() => {
        specificationsRepositoryInMemory =
            new SpecificationsRepositoryInMemory();
        createSpecificationUseCase = new CreateSpecificationUseCase(
            specificationsRepositoryInMemory
        );
    });

    it("should be able to create a new specification", async () => {
        const specification = {
            name: "Specification Name Create",
            description: "Specification Description Create",
        };

        await createSpecificationUseCase.execute({
            name: specification.name,
            description: specification.description,
        });

        const specificationCreated =
            await specificationsRepositoryInMemory.find({
                name: specification.name,
            });

        expect(specificationCreated.shift()).toHaveProperty("id");
    });

    it("should not be able to create a new specification with an existing name", async () => {
        const specification = {
            name: "Specification Name Create",
            description: "Specification Description Create",
        };

        await createSpecificationUseCase.execute({
            name: specification.name,
            description: specification.description,
        });

        await expect(
            createSpecificationUseCase.execute({
                name: specification.name,
                description: specification.description,
            })
        ).rejects.toEqual(new AppError("Specification already exists"));
    });
});
