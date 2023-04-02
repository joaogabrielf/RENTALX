import { hash } from "bcryptjs";
import request from "supertest";
import { DataSource } from "typeorm";

import { app } from "@shared/infra/http/app";
import { AppDataSource } from "@shared/infra/typeorm/data-source";
import { databaseOptions } from "@shared/infra/typeorm/database";

let dataSource: DataSource;
describe("List Cars Specifications Controller", () => {
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

    it("should be able to list all cars specifications", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@rentalx.com",
            password: "admin",
        });

        const car = await request(app)
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

        await request(app)
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

        const response = await request(app).get(
            `/cars/specifications/${car.body.id}`
        );

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
    });

    afterAll(async () => {
        await dataSource.dropDatabase();
        await dataSource.destroy();
        await AppDataSource.destroy();
    });
});
