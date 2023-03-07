import { ICarFilterListDTO } from "../dtos/ICarFilterListDTO";
import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

export interface ICarsRepository {
    create(data: ICreateCarDTO): Promise<Car>;
    find(
        filterBy: ICarFilterListDTO,
        orderBy?: string,
        onlyAvailable?: boolean
    ): Promise<Car[]>;
}
