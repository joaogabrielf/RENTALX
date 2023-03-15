import { MigrationInterface, QueryRunner } from "typeorm";

export class generate1678842344583 implements MigrationInterface {
    name = "generate1678842344583";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "cars" DROP CONSTRAINT "FKCategoryCar"`
        );
        await queryRunner.query(
            `ALTER TABLE "cars_image" DROP CONSTRAINT "FKCarImage"`
        );
        await queryRunner.query(
            `ALTER TABLE "specifications_cars" DROP CONSTRAINT "FKSpecificationCar"`
        );
        await queryRunner.query(
            `ALTER TABLE "specifications_cars" DROP CONSTRAINT "FKCarSpecification"`
        );
        await queryRunner.query(
            `ALTER TABLE "specifications_cars" DROP COLUMN "created_at"`
        );
        await queryRunner.query(
            `ALTER TABLE "cars" ADD "fine_amount" integer NOT NULL`
        );
        await queryRunner.query(
            `ALTER TABLE "users_tokens" DROP CONSTRAINT "FK_32f96022cc5076fe565a5cba20b"`
        );
        await queryRunner.query(
            `ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`
        );
        await queryRunner.query(
            `ALTER TABLE "users" ALTER COLUMN "isAdmin" SET DEFAULT false`
        );
        await queryRunner.query(
            `ALTER TABLE "categories" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`
        );
        await queryRunner.query(
            `ALTER TABLE "specifications" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`
        );
        await queryRunner.query(
            `ALTER TABLE "rentals" DROP CONSTRAINT "FK_243d136cb7fd3e65b4630fe6bf9"`
        );
        await queryRunner.query(
            `ALTER TABLE "cars" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`
        );
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "daily_rate"`);
        await queryRunner.query(
            `ALTER TABLE "cars" ADD "daily_rate" integer NOT NULL`
        );
        await queryRunner.query(
            `ALTER TABLE "cars" ALTER COLUMN "category_id" DROP NOT NULL`
        );
        await queryRunner.query(
            `ALTER TABLE "cars_image" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`
        );
        await queryRunner.query(
            `ALTER TABLE "cars_image" DROP COLUMN "car_id"`
        );
        await queryRunner.query(
            `ALTER TABLE "cars_image" ADD "car_id" character varying NOT NULL`
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_a9606be942c7a7983466a0aa30" ON "specifications_cars" ("car_id") `
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_06812f537c06afbf37a9938f35" ON "specifications_cars" ("specification_id") `
        );
        await queryRunner.query(
            `ALTER TABLE "users_tokens" ADD CONSTRAINT "FK_32f96022cc5076fe565a5cba20b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE "cars" ADD CONSTRAINT "FK_9b6410d2f4eabb985524faae074" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE "rentals" ADD CONSTRAINT "FK_243d136cb7fd3e65b4630fe6bf9" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE "specifications_cars" ADD CONSTRAINT "FK_a9606be942c7a7983466a0aa300" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE CASCADE ON UPDATE CASCADE`
        );
        await queryRunner.query(
            `ALTER TABLE "specifications_cars" ADD CONSTRAINT "FK_06812f537c06afbf37a9938f352" FOREIGN KEY ("specification_id") REFERENCES "specifications"("id") ON DELETE CASCADE ON UPDATE CASCADE`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "specifications_cars" DROP CONSTRAINT "FK_06812f537c06afbf37a9938f352"`
        );
        await queryRunner.query(
            `ALTER TABLE "specifications_cars" DROP CONSTRAINT "FK_a9606be942c7a7983466a0aa300"`
        );
        await queryRunner.query(
            `ALTER TABLE "rentals" DROP CONSTRAINT "FK_243d136cb7fd3e65b4630fe6bf9"`
        );
        await queryRunner.query(
            `ALTER TABLE "cars" DROP CONSTRAINT "FK_9b6410d2f4eabb985524faae074"`
        );
        await queryRunner.query(
            `ALTER TABLE "users_tokens" DROP CONSTRAINT "FK_32f96022cc5076fe565a5cba20b"`
        );
        await queryRunner.query(
            `DROP INDEX "public"."IDX_06812f537c06afbf37a9938f35"`
        );
        await queryRunner.query(
            `DROP INDEX "public"."IDX_a9606be942c7a7983466a0aa30"`
        );
        await queryRunner.query(
            `ALTER TABLE "cars_image" DROP COLUMN "car_id"`
        );
        await queryRunner.query(
            `ALTER TABLE "cars_image" ADD "car_id" uuid NOT NULL`
        );
        await queryRunner.query(
            `ALTER TABLE "cars_image" ALTER COLUMN "id" DROP DEFAULT`
        );
        await queryRunner.query(
            `ALTER TABLE "cars" ALTER COLUMN "category_id" SET NOT NULL`
        );
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "daily_rate"`);
        await queryRunner.query(
            `ALTER TABLE "cars" ADD "daily_rate" numeric NOT NULL`
        );
        await queryRunner.query(
            `ALTER TABLE "cars" ALTER COLUMN "id" DROP DEFAULT`
        );
        await queryRunner.query(
            `ALTER TABLE "rentals" ADD CONSTRAINT "FK_243d136cb7fd3e65b4630fe6bf9" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE "specifications" ALTER COLUMN "id" DROP DEFAULT`
        );
        await queryRunner.query(
            `ALTER TABLE "categories" ALTER COLUMN "id" DROP DEFAULT`
        );
        await queryRunner.query(
            `ALTER TABLE "users" ALTER COLUMN "isAdmin" DROP DEFAULT`
        );
        await queryRunner.query(
            `ALTER TABLE "users" ALTER COLUMN "id" DROP DEFAULT`
        );
        await queryRunner.query(
            `ALTER TABLE "users_tokens" ADD CONSTRAINT "FK_32f96022cc5076fe565a5cba20b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "fine_amount"`);
        await queryRunner.query(
            `ALTER TABLE "specifications_cars" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`
        );
        await queryRunner.query(
            `ALTER TABLE "specifications_cars" ADD CONSTRAINT "FKCarSpecification" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE SET NULL ON UPDATE SET NULL`
        );
        await queryRunner.query(
            `ALTER TABLE "specifications_cars" ADD CONSTRAINT "FKSpecificationCar" FOREIGN KEY ("specification_id") REFERENCES "specifications"("id") ON DELETE SET NULL ON UPDATE SET NULL`
        );
        await queryRunner.query(
            `ALTER TABLE "cars_image" ADD CONSTRAINT "FKCarImage" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE SET NULL ON UPDATE SET NULL`
        );
        await queryRunner.query(
            `ALTER TABLE "cars" ADD CONSTRAINT "FKCategoryCar" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE SET NULL`
        );
    }
}
