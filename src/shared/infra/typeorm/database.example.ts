import { DataSourceOptions } from "typeorm";

const databaseOptions: DataSourceOptions = {
    type: "postgres",
    host: "postgres",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    entities: ["dist/modules/*/infra/typeorm/entities/*{.ts,.js}"],
    logging: false,
    migrations: ["dist/shared/infra/typeorm/migrations/*{.ts,.js}"],
    migrationsTableName: "custom_migration_table",
};
export { databaseOptions };
