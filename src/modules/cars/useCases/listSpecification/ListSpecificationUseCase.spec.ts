import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";

import { ListSpecificationUseCase } from "./ListSpecificationUseCase";

// import { AppError } from "@shared/errors/AppError";

let listSpecificationUseCase: ListSpecificationUseCase;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("List Car's specifications", () => {
    beforeEach(() => {
        specificationsRepositoryInMemory =
            new SpecificationsRepositoryInMemory();
        listSpecificationUseCase = new ListSpecificationUseCase(
            specificationsRepositoryInMemory
        );
    });

    it("should be able to list all specifications", async () => {
        const specification1 = await specificationsRepositoryInMemory.create({
            name: "name Test",
            description: "Desc Test",
        });

        const specification2 = await specificationsRepositoryInMemory.create({
            name: "name2 Test2",
            description: "Desc2 Test2",
        });

        const specifications = await listSpecificationUseCase.execute();
        expect(specifications).toEqual([specification1, specification2]);
    });
});
