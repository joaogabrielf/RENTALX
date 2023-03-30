import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListSpecificationUseCase {
    constructor(
        @inject("SpecificationRepository")
        private specificationRepository: ISpecificationRepository
    ) {}

    async execute(): Promise<Specification[]> {
        const categories = await this.specificationRepository.list();
        return categories;
    }
}
