import { DataSourceOptions } from "typeorm";

const databaseOptions: DataSourceOptions = {
    type: "postgres",
    host: "HOST_NAME",
    port: 5432,
    username: "USERNAME",
    password: "PASS",
    database: "DB_NAME",
    entities: ["src/modules/*/infra/typeorm/entities/*{.ts,.js}"],
    logging: false,
    migrations: ["src/shared/infra/typeorm/migrations/*{.ts,.js}"],
    migrationsTableName: "custom_migration_table",
};
export { databaseOptions };
