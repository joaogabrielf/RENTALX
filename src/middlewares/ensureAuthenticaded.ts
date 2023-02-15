import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticaded(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new AppError("Token missing", 401);
    }

    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(
            token,
            "c9a99e42f92ffbc59fddda7b9d833329742655676c85d29b8d67fa51cd4e6b72"
        ) as IPayload;

        const usersRepository = new UsersRepository();
        usersRepository.findById(user_id);
        if (!user_id) {
            throw new AppError("User does not exist", 401);
        }
        next();
    } catch {
        throw new AppError("Invalid token", 401);
    }
}
