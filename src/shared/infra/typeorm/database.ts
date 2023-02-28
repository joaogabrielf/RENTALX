import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { DataSourceOptions } from "typeorm";

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
    migrations: ["src/shared/infra/typeorm/migrations/*{.ts,.js}"],
    migrationsTableName: "custom_migration_table",
};
export { databaseOptions };
