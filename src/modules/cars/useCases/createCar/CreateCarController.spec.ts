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

    it("should be able to create a new car", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@rentalx.com",
            password: "admin",
        });

        const category = await request(app)
            .post("/categories")
            .send({
                name: "Category Supertest",
                description: "Category Supertest",
            })
            .set({
                Authorization: `Bearer ${responseToken.body.token}`,
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
                category_id: category.body.id,
            })
            .set({
                Authorization: `Bearer ${responseToken.body.token}`,
            });

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

    it("should not be able to create a new car with a non existing category", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@rentalx.com",
            password: "admin",
        });

        await request(app)
            .post("/categories")
            .send({
                name: "Category Supertest",
                description: "Category Supertest",
            })
            .set({
                Authorization: `Bearer ${responseToken.body.token}`,
            });

        const categoryResponse = await request(app).get("/categories");
        const { category_id } = categoryResponse.body[0];

        const response = await request(app)
            .post("/cars")
            .send({
                name: "Name Car Supertest",
                description: "Desc Car Supertest",
                daily_rate: 120,
                license_plate: "QWE-1334",
                fine_amount: 54,
                brand: "Brand Car Supertest",
                category_id,
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
