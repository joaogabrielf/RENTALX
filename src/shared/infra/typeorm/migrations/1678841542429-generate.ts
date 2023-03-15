import { MigrationInterface, QueryRunner } from "typeorm";

export class generate1678841542429 implements MigrationInterface {
    name = "generate1678841542429";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "users_tokens" DROP CONSTRAINT "FKUserToken"`
        );
        await queryRunner.query(
            `ALTER TABLE "rentals" DROP CONSTRAINT "FKCarRental"`
        );
        await queryRunner.query(
            `ALTER TABLE "rentals" DROP CONSTRAINT "FKUserRental"`
        );
        await queryRunner.query(
            `ALTER TABLE "users_tokens" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`
        );
        await queryRunner.query(
            `ALTER TABLE "rentals" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`
        );
        await queryRunner.query(`ALTER TABLE "rentals" DROP COLUMN "user_id"`);
        await queryRunner.query(
            `ALTER TABLE "rentals" ADD "user_id" character varying NOT NULL`
        );
        await queryRunner.query(
            `ALTER TABLE "rentals" ALTER COLUMN "start_date" DROP DEFAULT`
        );
        await queryRunner.query(
            `ALTER TABLE "rentals" ALTER COLUMN "end_date" SET NOT NULL`
        );
        await queryRunner.query(`ALTER TABLE "rentals" DROP COLUMN "total"`);
        await queryRunner.query(
            `ALTER TABLE "rentals" ADD "total" integer NOT NULL`
        );
        await queryRunner.query(
            `ALTER TABLE "users_tokens" ADD CONSTRAINT "FK_32f96022cc5076fe565a5cba20b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE "rentals" ADD CONSTRAINT "FK_243d136cb7fd3e65b4630fe6bf9" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "rentals" DROP CONSTRAINT "FK_243d136cb7fd3e65b4630fe6bf9"`
        );
        await queryRunner.query(
            `ALTER TABLE "users_tokens" DROP CONSTRAINT "FK_32f96022cc5076fe565a5cba20b"`
        );
        await queryRunner.query(`ALTER TABLE "rentals" DROP COLUMN "total"`);
        await queryRunner.query(`ALTER TABLE "rentals" ADD "total" numeric`);
        await queryRunner.query(
            `ALTER TABLE "rentals" ALTER COLUMN "end_date" DROP NOT NULL`
        );
        await queryRunner.query(
            `ALTER TABLE "rentals" ALTER COLUMN "start_date" SET DEFAULT now()`
        );
        await queryRunner.query(`ALTER TABLE "rentals" DROP COLUMN "user_id"`);
        await queryRunner.query(
            `ALTER TABLE "rentals" ADD "user_id" uuid NOT NULL`
        );
        await queryRunner.query(
            `ALTER TABLE "rentals" ALTER COLUMN "id" DROP DEFAULT`
        );
        await queryRunner.query(
            `ALTER TABLE "users_tokens" ALTER COLUMN "id" DROP DEFAULT`
        );
        await queryRunner.query(
            `ALTER TABLE "rentals" ADD CONSTRAINT "FKUserRental" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE SET NULL`
        );
        await queryRunner.query(
            `ALTER TABLE "rentals" ADD CONSTRAINT "FKCarRental" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE SET NULL ON UPDATE SET NULL`
        );
        await queryRunner.query(
            `ALTER TABLE "users_tokens" ADD CONSTRAINT "FKUserToken" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`
        );
    }
}
