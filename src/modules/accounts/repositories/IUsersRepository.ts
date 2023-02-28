import { ICreateUserDTO } from "@modules/dtos/ICreateUserDTO";

import { User } from "../infra/typeorm/entities/User";

export interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<void>;
    findByEmail(email: string): Promise<User>;
    findById(id: string): Promise<User>;
}
