import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";

import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

let listCategoriesUseCase: ListCategoriesUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("List Categories", () => {
    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        listCategoriesUseCase = new ListCategoriesUseCase(
            categoriesRepositoryInMemory
        );
    });

    it("should be able to list all specifications", async () => {
        await categoriesRepositoryInMemory.create({
            name: "Category Name 1",
            description: "Category Desc 1",
        });

        await categoriesRepositoryInMemory.create({
            name: "Category Name 2",
            description: "Category Desc 2",
        });

        const categories = await listCategoriesUseCase.execute();
        expect(categories.length).toBe(2);
        expect(categories[0].name).toBe("Category Name 1");
        expect(categories[0].description).toBe("Category Desc 1");
        expect(categories[1].name).toBe("Category Name 2");
        expect(categories[1].description).toBe("Category Desc 2");
    });
});
