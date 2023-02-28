import "reflect-metadata";
import { DataSource } from "typeorm";

import { databaseOptions } from "./database";

const AppDataSource = new DataSource(databaseOptions);

AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
    })
    .catch((error) => console.log(error));

export { AppDataSource };
