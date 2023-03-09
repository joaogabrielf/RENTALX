import { DataSourceOptions } from "typeorm";

const databaseOptions: DataSourceOptions = {
    type: "postgres",
    host:
        process.argv.some((x) => !!x.match(/migration|seed/)) ||
        process.env.NODE_ENV === "test"
            ? "localhost"
            : "database",
    port: 5432,
    // synchronize: process.env.NODE_ENV === "test",
    username: "docker",
    password: "ignite",
    // database: "rentalx",
    database: process.env.NODE_ENV === "test" ? "rentalx_test" : "rentalx",
    entities: ["src/modules/*/infra/typeorm/entities/*{.ts,.js}"],
    // synchronize: true,
    logging: false,
    migrations: ["src/shared/infra/typeorm/migrations/*{.ts,.js}"],
    migrationsTableName: "custom_migration_table",
};
export { databaseOptions };
