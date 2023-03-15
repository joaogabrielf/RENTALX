import auth from "@config/auth";
import { IUsersTokensRepository } from "@modules/accounts/repositories/in-memory/IUsersTokensRepository";
import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
    sub: string;
    email: string;
}

@injectable()
export class RefreshTokenUseCase {
    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: DayjsDateProvider
    ) {}
    async execute(token: string): Promise<string> {
        const { sub, email } = verify(
            token,
            auth.secret_refresh_token
        ) as IPayload;

        const userToken =
            await this.usersTokensRepository.findByUserRefreshToken(sub, token);

        if (!userToken) {
            throw new AppError("Refresh Token does not exist");
        }

        await this.usersTokensRepository.deleteById(sub);

        const refresh_token_expires_date = this.dateProvider.addDays(
            auth.expires_refresh_token_days
        );

        const refresh_token = sign({ email }, auth.secret_refresh_token, {
            subject: sub,
            expiresIn: auth.expires_in_refresh_token,
        });

        await this.usersTokensRepository.create({
            user_id: sub,
            refresh_token,
            expires_date: refresh_token_expires_date,
        });

        return refresh_token;
    }
}
