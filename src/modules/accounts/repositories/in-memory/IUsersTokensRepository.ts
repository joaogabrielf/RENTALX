import { ICreateUserTokensDTO } from "@modules/accounts/dtos/ICreateUserTokensDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";

export interface IUsersTokensRepository {
    create({
        user_id,
        expires_date,
        refresh_token,
    }: ICreateUserTokensDTO): Promise<UserTokens>;

    findByUserRefreshToken(
        user_id: string,
        refresh_token: string
    ): Promise<UserTokens>;

    deleteById(id: string): Promise<void>;
}
