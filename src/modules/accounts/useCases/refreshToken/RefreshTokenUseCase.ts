import auth from "@config/auth";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
    sub: string;
    email: string;
}

interface ITokenResponse {
    token: string;
    refresh_token: string;
}

@injectable()
export class RefreshTokenUseCase {
    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: DayjsDateProvider
    ) {}
    async execute(token: string): Promise<ITokenResponse> {
        const { sub, email } = verify(
            token,
            auth.secret_refresh_token
        ) as IPayload;

        const user_id = sub;

        const userToken =
            await this.usersTokensRepository.findByUserRefreshToken(
                user_id,
                token
            );

        if (!userToken) {
            throw new AppError("Refresh Token does not exist");
        }

        await this.usersTokensRepository.deleteById(user_id);

        const refresh_token_expires_date = this.dateProvider.addDays(
            auth.expires_refresh_token_days
        );

        const refresh_token = sign({ email }, auth.secret_refresh_token, {
            subject: user_id,
            expiresIn: auth.expires_in_refresh_token,
        });

        await this.usersTokensRepository.create({
            user_id,
            refresh_token,
            expires_date: refresh_token_expires_date,
        });

        const newToken = sign({}, auth.secret_token, {
            subject: user_id,
            expiresIn: auth.expires_in_token,
        });

        return {
            refresh_token,
            token: newToken,
        };
    }
}
