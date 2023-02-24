import { v4 as uuidv4 } from "uuid";

import { Category } from "../../entities/Category";
import {
    ICategoriesRepository,
    ICreateCategoryDTO,
} from "../implementations/ICategoriesRepository";

export class CategoriesRepositoryInMemory implements ICategoriesRepository {
    categories: Category[] = [];

    async findByName(name: string): Promise<Category> {
        const category = this.categories.find(
            (category) => category.name === name
        );
        return category;
    }
    async list(): Promise<Category[]> {
        const all = this.categories;
        return all;
    }
    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = new Category();

        Object.assign(category, {
            id: uuidv4(),
            name,
            description,
        });

        this.categories.push(category);
    }
}
