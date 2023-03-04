import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { IFilterListDTO } from "../dtos/IFilterListDTO";
import { Car } from "../infra/typeorm/entities/Car";

export interface ICarsRepository {
    create(data: ICreateCarDTO): Promise<Car>;
    findByLicensePlate(license_plate: string): Promise<Car>;
    find(
        filterBy: IFilterListDTO,
        orderBy?: string,
        onlyAvailable?: boolean
    ): Promise<Car[]>;
}
