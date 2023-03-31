import { DataSourceOptions } from "typeorm";

const databaseOptions: DataSourceOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "password",
    database: "postgres",
    entities: ["src/modules/*/infra/typeorm/entities/*{.ts,.js}"],
    logging: false,
    migrations: ["src/shared/infra/typeorm/migrations/*{.ts,.js}"],
    migrationsTableName: "custom_migration_table",
};
export { databaseOptions };
