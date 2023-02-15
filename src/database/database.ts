import { DataSourceOptions } from "typeorm";

import { User } from "../modules/accounts/entities/User";
import { Category } from "../modules/cars/entities/Category";
import { Specification } from "../modules/cars/entities/Specification";

const databaseOptions: DataSourceOptions = {
    type: "postgres",
    // host: "localhost",
    host: process.argv.some((x) => !!x.match(/migration/))
        ? "localhost"
        : "database",
    port: 5432,
    username: "docker",
    password: "ignite",
    database: "rentalx",
    entities: [Category, Specification, User],
    synchronize: true,
    logging: false,
    migrations: ["src/database/migrations/*{.ts,.js}"],
    migrationsTableName: "custom_migration_table",
};
export { databaseOptions };
