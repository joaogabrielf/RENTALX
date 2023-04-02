import { hash } from "bcryptjs";
import request from "supertest";
import { DataSource } from "typeorm";

import { app } from "@shared/infra/http/app";
import { AppDataSource } from "@shared/infra/typeorm/data-source";
import { databaseOptions } from "@shared/infra/typeorm/database";

let dataSource: DataSource;
describe("Create Specifications Controller", () => {
    beforeAll(async () => {
        dataSource = new DataSource(databaseOptions);

        await dataSource.initialize();
        await dataSource.synchronize();

        const password = await hash("admin", 8);
        await dataSource.query(
            `INSERT INTO USERS("name", "email", "password", "isAdmin", "driver_license")
            SELECT 'Admin', 'admin@rentalx.com', '${password}', true, 'ASD-1243'
            WHERE NOT EXISTS (
            SELECT ID FROM USERS WHERE LOWER(NAME) = 'admin')`
        );
    });

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it("should be able to create a new specification", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@rentalx.com",
            password: "admin",
        });

        const response = await request(app)
            .post("/specifications")
            .send({
                name: "Specification Supertest Name Create",
                description: "Specification Supertest Description Create",
            })
            .set({
                Authorization: `Bearer ${responseToken.body.token}`,
            });

        expect(response.status).toBe(201);
    });

    it("should not be able to create a new specification with an existing name", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@rentalx.com",
            password: "admin",
        });

        await request(app)
            .post("/specifications")
            .send({
                name: "Specification Supertest Name Create Existing Name",
                description:
                    "Specification Supertest Description Create Existing Name",
            })
            .set({
                Authorization: `Bearer ${responseToken.body.token}`,
            });

        const response = await request(app)
            .post("/specifications")
            .send({
                name: "Specification Supertest Name Create Existing Name",
                description:
                    "Specification Supertest Description Create Existing Name",
            })
            .set({
                Authorization: `Bearer ${responseToken.body.token}`,
            });

        expect(response.status).toBe(400);
    });

    afterAll(async () => {
        await dataSource.dropDatabase();
        await dataSource.destroy();
        await AppDataSource.destroy();
    });
});
