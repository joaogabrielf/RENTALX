import { hash } from "bcryptjs";
import request from "supertest";
import { DataSource } from "typeorm";

import { app } from "@shared/infra/http/app";
import { AppDataSource } from "@shared/infra/typeorm/data-source";
import { databaseOptions } from "@shared/infra/typeorm/database";

let dataSource: DataSource;
describe("GET /specifications", () => {
    beforeAll(async () => {
        dataSource = new DataSource(databaseOptions);

        await dataSource.initialize();
        await dataSource.synchronize();
    });

    it("should be able to list all specifications", async () => {
        await request(app).post("/specifications").send({
            name: "TEST 1 SPECIFICATION",
            description: "TEST 1 SPECIFICATION",
        });

        await request(app).post("/specifications").send({
            name: "TEST 2 SPECIFICATION",
            description: "TEST 2 SPECIFICATION",
        });

        const response = await request(app).get("/specifications");

        console.log(response);

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
        expect(response.body[0]).toHaveProperty("id");
        expect(response.body[0].name).toEqual("TEST 1 SPECIFICATION");
    });

    afterAll(async () => {
        await dataSource.dropDatabase();
        await dataSource.destroy();
        await AppDataSource.destroy();
    });
});
