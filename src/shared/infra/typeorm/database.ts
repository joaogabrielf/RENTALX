import { DataSourceOptions } from "typeorm";

const databaseOptions: DataSourceOptions = {
    type: "postgres",
    host: process.argv.some((x) => !!x.match(/migration|seed/))
        ? "localhost"
        : "database",
    port: 5432,
    username: "docker",
    password: "ignite",
    database: "rentalx",
    entities: ["src/modules/*/infra/typeorm/entities/*{.ts,.js}"],
    synchronize: true,
    logging: false,
    migrations: ["src/shared/infra/typeorm/migrations/*{.ts,.js}"],
    migrationsTableName: "custom_migration_table",
};
export { databaseOptions };
