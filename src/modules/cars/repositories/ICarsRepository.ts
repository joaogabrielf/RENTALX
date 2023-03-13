import { ICarFilterListDTO } from "../dtos/ICarFilterListDTO";
import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

export interface ICarsRepository {
    create(data: ICreateCarDTO): Promise<Car>;
    find(
        filterBy: ICarFilterListDTO,
        onlyAvailable?: boolean,
        orderBy?: string
    ): Promise<Car[]>;
    updateAvailable(id: string, available: boolean): Promise<void>;
}
