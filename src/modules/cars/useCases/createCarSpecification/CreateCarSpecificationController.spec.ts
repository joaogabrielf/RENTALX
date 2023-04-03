import { hash } from "bcryptjs";
import request from "supertest";
import { DataSource } from "typeorm";

import { app } from "@shared/infra/http/app";
import { AppDataSource } from "@shared/infra/typeorm/data-source";
import { databaseOptions } from "@shared/infra/typeorm/database";

let dataSource: DataSource;
describe("POST /cars/specifications/{id}", () => {
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

    it("should be able to create a new car specification", async () => {
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

        const car = await request(app)
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

        await request(app)
            .post("/specifications")
            .send({
                name: "Specification1 Test AC",
                description: "Specification1 Test Ar Condicionado",
            })
            .set({
                Authorization: `Bearer ${responseToken.body.token}`,
            });

        await request(app)
            .post("/specifications")
            .send({
                name: "Specification2 Test AC",
                description: "Specification2 Test Ar Condicionado",
            })
            .set({
                Authorization: `Bearer ${responseToken.body.token}`,
            });

        const specifications = await request(app).get("/specifications");

        const response = await request(app)
            .post(`/cars/specifications/${car.body.id}`)
            .send({
                specifications_id: [
                    specifications.body[0].id,
                    specifications.body[1].id,
                ],
            })
            .set({
                Authorization: `Bearer ${responseToken.body.token}`,
            });

        expect(response.status).toBe(201);
    });

    afterAll(async () => {
        await dataSource.dropDatabase();
        await dataSource.destroy();
        await AppDataSource.destroy();
    });
});
