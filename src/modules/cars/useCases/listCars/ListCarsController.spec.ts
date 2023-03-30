import request from "supertest";
import { DataSource } from "typeorm";

import { app } from "@shared/infra/http/app";
import { databaseOptions } from "@shared/infra/typeorm/database";

let dataSource: DataSource;
describe("List Cars Controller", () => {
    beforeAll(async () => {
        dataSource = new DataSource(databaseOptions);

        await dataSource.initialize();
        await dataSource.synchronize();

        await dataSource.query(
            `INSERT INTO CARS("id", "name", "description", "daily_rate", "license_plate", "fine_amount", "brand")
            VALUES ('b2d6305b-bb06-4cb9-bac2-1a59fef73a3b', 'Uno', 'Uno novo 2017', 120.00, 'AFX-3123', 45.00, 'Fiat')`
        );

        await dataSource.query(
            `INSERT INTO CARS("id", "name", "description", "daily_rate", "license_plate", "fine_amount", "brand")
            VALUES ('265bfeeb-5e84-4dc6-9822-e1f62713e6fa', 'Palio', 'Palio novo 2017', 130.00, 'AFX-3333', 55.00, 'Fiat')`
        );
    });

    it("should be able list all cars", async () => {
        const response = await request(app).get("/cars/list");

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
    });

    afterAll(async () => {
        await dataSource.dropDatabase();
        await dataSource.destroy();
    });
});
