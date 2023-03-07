import { ICreateSpecificationDTO } from "@modules/cars/dtos/ICreateSpecificationDTO";
import { ISpecificationFilterListDTO } from "@modules/cars/dtos/ISpecificationFilterListDTO";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { v4 as uuidv4 } from "uuid";

import { ISpecificationRepository } from "../ISpecificationRepository";

export class SpecificationsRepositoryInMemory
    implements ISpecificationRepository
{
    specifications: Specification[] = [];

    async create({
        name,
        description,
    }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = new Specification();

        Object.assign(specification, {
            id: uuidv4(),
            name,
            description,
            created_at: new Date(),
        });

        this.specifications.push(specification);

        return specification;
    }
    async find(
        filterBy: ISpecificationFilterListDTO
    ): Promise<Specification[]> {
        const { ids, name } = filterBy;

        return this.specifications.filter(
            (specification) =>
                ids.includes(specification.id) || specification.name === name
        );
    }
}
