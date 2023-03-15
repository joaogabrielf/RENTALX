import { ICreateUserTokensDTO } from "@modules/accounts/dtos/ICreateUserTokensDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/in-memory/IUsersTokensRepository";
import { Repository } from "typeorm";

import { AppDataSource } from "@shared/infra/typeorm/data-source";

import { UserTokens } from "../entities/UserTokens";

export class UsersTokensRepository implements IUsersTokensRepository {
    private repository: Repository<UserTokens>;

    constructor() {
        this.repository = AppDataSource.getRepository(UserTokens);
    }

    async create({
        user_id,
        expires_date,
        refresh_token,
    }: ICreateUserTokensDTO): Promise<UserTokens> {
        const userTokens = this.repository.create({
            refresh_token,
            user_id,
            expires_date,
        });

        await this.repository.save(userTokens);

        return userTokens;
    }

    async findByUserRefreshToken(
        user_id: string,
        refresh_token: string
    ): Promise<UserTokens> {
        const usersTokens = await this.repository.findOneBy({
            user_id,
            refresh_token,
        });
        return usersTokens;
    }

    async deleteById(id: string): Promise<void> {
        await this.repository.delete({ user_id: id });
    }
}
