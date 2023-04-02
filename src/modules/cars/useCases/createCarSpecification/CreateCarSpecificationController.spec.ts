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

        await dataSource.query(
            `INSERT INTO CARS("id", "name", "description", "daily_rate", "license_plate", "fine_amount", "brand")
            VALUES ('b2d6305b-bb06-4cb9-bac2-1a59fef73a3b', 'Uno', 'Uno novo 2017', 120.00, 'AFX-3123', 45.00, 'Fiat')`
        );

        await dataSource.query(
            `INSERT INTO SPECIFICATIONS("id", "name", "description")
            VALUES ('66b9f7e1-26ea-4867-854a-4d4a53ad8214', 'AC', 'Ar condicionado')`
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
        const specification = await request(app)
            .post("/specifications")
            .send({
                name: "Specification Supertest Name Create",
                description: "Specification Supertest Description Create",
            })
            .set({
                Authorization: `Bearer ${responseToken.body.token}`,
            });

        const response = await request(app)
            .post(`/cars/specifications/${car.body.id}`)
            .send({
                specifications_id: [specification.body.id],
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
