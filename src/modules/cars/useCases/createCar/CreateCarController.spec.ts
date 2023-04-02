import { hash } from "bcryptjs";
import request from "supertest";
import { DataSource } from "typeorm";

import { app } from "@shared/infra/http/app";
import { AppDataSource } from "@shared/infra/typeorm/data-source";
import { databaseOptions } from "@shared/infra/typeorm/database";

let dataSource: DataSource;
describe("POST /cars", () => {
    beforeAll(async () => {
        dataSource = new DataSource(databaseOptions);

        await dataSource.initialize();
        await dataSource.synchronize();

        const password = await hash("admin", 8);
        const queryAdmin = await dataSource.query(
            `INSERT INTO USERS("name", "email", "password", "isAdmin", "driver_license")
            SELECT 'Admin', 'admin@rentalx.com', '${password}', true, 'ASD-1243'
            WHERE NOT EXISTS (
            SELECT ID FROM USERS WHERE LOWER(NAME) = 'admin')`
        );

        console.log("Admin", queryAdmin);

        const queryCategory = await dataSource.query(
            `INSERT INTO CATEGORIES("id", "name", "description")
            VALUES ('0dd6eda1-ffad-4acb-a2b4-cfaef68abf28', 'Category Name', 'Category Description')`
        );

        console.log("Category", queryCategory);
    });

    it("should be able to create a new car", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@rentalx.com",
            password: "admin",
        });
        console.log("TOKEN", responseToken);

        const response = await request(app)
            .post("/cars")
            .send({
                name: "Name Car Supertest",
                description: "Desc Car Supertest",
                daily_rate: 120,
                license_plate: "QWE-1334",
                fine_amount: 54,
                brand: "Brand Car Supertest",
                category_id: null,
            })
            .set({
                Authorization: `Bearer ${responseToken.body.token}`,
            });

        console.log("Response", response);

        expect(response.status).toBe(201);
    });

    it("should not be able to create a new car with an existing name", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@rentalx.com",
            password: "admin",
        });

        const response = await request(app)
            .post("/cars")
            .send({
                name: "Name Car Supertest",
                description: "Desc Car Supertest",
                daily_rate: 120,
                license_plate: "QWE-1334",
                fine_amount: 54,
                brand: "Brand Car Supertest",
                category_id: null,
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
