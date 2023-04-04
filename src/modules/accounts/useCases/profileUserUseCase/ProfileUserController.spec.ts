import { hash } from "bcryptjs";
import request from "supertest";
import { DataSource } from "typeorm";

import { app } from "@shared/infra/http/app";
import { AppDataSource } from "@shared/infra/typeorm/data-source";
import { databaseOptions } from "@shared/infra/typeorm/database";

let dataSource: DataSource;
describe("GET /users/profile", () => {
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

    it("should be able to list user profile", async () => {
        const responseTokenAdmin = await request(app).post("/sessions").send({
            email: "admin@rentalx.com",
            password: "admin",
        });

        const { name, password, email, driver_license } = {
            name: "Wayne Burgess",
            password: "A0GLmmYFBi",
            email: "alsefsu@kes.ps",
            driver_license: "64682520",
        };

        await request(app)
            .post("/users")
            .send({
                name,
                password,
                email,
                driver_license,
            })
            .set({
                Authorization: `Bearer ${responseTokenAdmin.body.token}`,
            });

        const responseToken = await request(app).post("/sessions").send({
            email,
            password,
        });

        const response = await request(app)
            .get("/users/profile")
            .set({
                Authorization: `Bearer ${responseToken.body.token}`,
            })
            .accept("json");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id");
    });

    afterAll(async () => {
        await dataSource.dropDatabase();
        await dataSource.destroy();
        await AppDataSource.destroy();
    });
});
