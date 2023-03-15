import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { Repository } from "typeorm";

import { AppDataSource } from "@shared/infra/typeorm/data-source";

import { User } from "../entities/User";

export class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }
    async findById(id: string): Promise<User> {
        const user = await this.repository.findOneBy({ id });
        return user;
    }
    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOneBy({ email });
        return user;
    }
    async create({
        name,
        email,
        driver_license,
        password,
        avatar,
        id,
    }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name,
            email,
            driver_license,
            password,
            avatar,
            id,
        });
        await this.repository.save(user);
    }
}
