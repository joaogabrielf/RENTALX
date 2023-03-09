import { ICreateSpecificationDTO } from "@modules/cars/dtos/ICreateSpecificationDTO";
import { ISpecificationFilterListDTO } from "@modules/cars/dtos/ISpecificationFilterListDTO";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { In, Repository } from "typeorm";

import { AppDataSource } from "@shared/infra/typeorm/data-source";

import { Specification } from "../entities/Specification";

class SpecificationRepository implements ISpecificationRepository {
    private repository: Repository<Specification>;

    constructor() {
        this.repository = AppDataSource.getRepository(Specification);
    }

    async create({
        name,
        description,
    }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = this.repository.create({
            description,
            name,
        });

        await this.repository.save(specification);

        return specification;
    }

    async find(
        filterBy: ISpecificationFilterListDTO
    ): Promise<Specification[]> {
        const { ids, name } = filterBy;
        const specification = await this.repository.findBy([
            { id: In(ids ?? []), name },
        ]);

        return specification;
    }
}

export { SpecificationRepository };
