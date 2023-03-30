import upload from "@config/upload";
import "reflect-metadata";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import { AppError } from "@shared/errors/AppError";

import swaggerFile from "../../../swagger.json";
import rateLimiter from "./middlewares/rateLimiter";
import { router } from "./routes";

import "../../container";

dotenv.config();

const app = express();

app.use(rateLimiter);

Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Tracing.Integrations.Express({ app }),
    ],

    tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`));

app.use(cors());
app.use(router);

app.use(Sentry.Handlers.errorHandler());

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppError) {
            return response
                .status(err.statusCode)
                .json({ message: err.message });
        }

        return response.status(500).json({
            status: "error",
            message: `Internal server error ${err.message}`,
        });
    }
);

export { app };
