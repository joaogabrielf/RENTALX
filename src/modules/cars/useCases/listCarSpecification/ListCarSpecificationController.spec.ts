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

        await dataSource.query(
            `INSERT INTO CARS("id", "name", "description", "daily_rate", "license_plate", "fine_amount", "brand")
            VALUES ('b2d6305b-bb06-4cb9-bac2-1a59fef73a3b', 'Uno', 'Uno novo 2017', 120.00, 'AFX-3123', 45.00, 'Fiat')`
        );

        await dataSource.query(
            `INSERT INTO SPECIFICATIONS("id", "name", "description")
            VALUES ('66b9f7e1-26ea-4867-854a-4d4a53ad8214', 'AC', 'Ar condicionado')`
        );

        await dataSource.query(
            `INSERT INTO SPECIFICATIONS("id", "name", "description")
            VALUES ('c2a6db77-c22e-4e18-aab2-c50bceacbace', 'DH', 'Direção Hidráulica')`
        );

        await dataSource.query(
            `INSERT INTO SPECIFICATIONS_CARS("car_id", "specification_id")
            VALUES ('b2d6305b-bb06-4cb9-bac2-1a59fef73a3b', '66b9f7e1-26ea-4867-854a-4d4a53ad8214')`
        );

        await dataSource.query(
            `INSERT INTO SPECIFICATIONS_CARS("car_id", "specification_id")
            VALUES ('b2d6305b-bb06-4cb9-bac2-1a59fef73a3b', 'c2a6db77-c22e-4e18-aab2-c50bceacbace')`
        );
    });

    const car_id = "b2d6305b-bb06-4cb9-bac2-1a59fef73a3b";

    it("should be able to list all cars specifications", async () => {
        const response = await request(app).get(
            `/cars/specifications/${car_id}`
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
