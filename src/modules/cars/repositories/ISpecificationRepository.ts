import { ICreateSpecificationDTO } from "../dtos/ICreateSpecificationDTO";
import { ISpecificationFilterListDTO } from "../dtos/ISpecificationFilterListDTO";
import { Specification } from "../infra/typeorm/entities/Specification";

interface ISpecificationRepository {
    create({
        name,
        description,
    }: ICreateSpecificationDTO): Promise<Specification>;
    // findByName(name: string): Promise<Specification>;
    find(filterBy: ISpecificationFilterListDTO): Promise<Specification[]>;
}

export { ISpecificationRepository };
