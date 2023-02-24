import { v4 as uuidv4 } from "uuid";

import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../implementations/IUsersRepository";

export class UsersRepositoryInMemory implements IUsersRepository {
    users: User[] = [];

    async create({
        driver_license,
        email,
        name,
        password,
    }: ICreateUserDTO): Promise<void> {
        const user = new User();

        Object.assign(user, {
            id: uuidv4(),
            driver_license,
            email,
            name,
            password,
        });

        this.users.push(user);
    }

    async findByEmail(email: string): Promise<User> {
        return this.users.find((user) => user.email === email);
    }

    async findById(id: string): Promise<User> {
        return this.users.find((user) => user.id === id);
    }
}
