import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import { RateLimiterRedis } from "rate-limiter-flexible";
import { createClient } from "redis";

import { AppError } from "@shared/errors/AppError";

dotenv.config();

const redisClient = createClient({
    legacyMode: true,
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        sessionTimeout: 20,
    },
});

const limiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: "rateLimiter",
    points: 5, // 5 requests
    duration: 5, // 5 second by IP
});

export default async function rateLimiter(
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    try {
        await redisClient.connect();
        await limiter.consume(request.ip);

        next();
    } catch (err) {
        throw new AppError("Too many requests", 429);
    } finally {
        await redisClient.disconnect();
    }
}
