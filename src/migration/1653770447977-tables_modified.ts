import {MigrationInterface, QueryRunner} from "typeorm";

export class tablesModified1653770447977 implements MigrationInterface {
    name = 'tablesModified1653770447977'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_fae92d2ac25104bc3c8c685b34"`);
        await queryRunner.query(`ALTER TABLE "followers_dev" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "followers_dev" ADD "userId" varchar2(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "followers_dev" DROP COLUMN "followerId"`);
        await queryRunner.query(`ALTER TABLE "followers_dev" ADD "followerId" varchar2(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "friendship_dev" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "friendship_dev" ADD "userId" varchar2(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "friendship_dev" DROP COLUMN "friendId"`);
        await queryRunner.query(`ALTER TABLE "friendship_dev" ADD "friendId" varchar2(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "friendship_dev" MODIFY "lastMessage" varchar2(255)  NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_260e4c231d18af4aa9ec698864" ON "followers_dev" ("userId")`);
        await queryRunner.query(`CREATE INDEX "IDX_b4908a1cf3cc182f3827ff8db8" ON "followers_dev" ("followerId")`);
        await queryRunner.query(`CREATE INDEX "IDX_27f39e250387abf21ca66bc76b" ON "friendship_dev" ("userId")`);
        await queryRunner.query(`CREATE INDEX "IDX_b1febfa49d3368d140b28123f7" ON "friendship_dev" ("friendId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_b1febfa49d3368d140b28123f7"`);
        await queryRunner.query(`DROP INDEX "IDX_27f39e250387abf21ca66bc76b"`);
        await queryRunner.query(`DROP INDEX "IDX_b4908a1cf3cc182f3827ff8db8"`);
        await queryRunner.query(`DROP INDEX "IDX_260e4c231d18af4aa9ec698864"`);
        await queryRunner.query(`ALTER TABLE "friendship_dev" MODIFY "lastMessage" varchar2(255)  NOT NULL`);
        await queryRunner.query(`ALTER TABLE "friendship_dev" DROP COLUMN "friendId"`);
        await queryRunner.query(`ALTER TABLE "friendship_dev" ADD "friendId" varchar2(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "friendship_dev" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "friendship_dev" ADD "userId" varchar2(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "followers_dev" DROP COLUMN "followerId"`);
        await queryRunner.query(`ALTER TABLE "followers_dev" ADD "followerId" varchar2(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "followers_dev" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "followers_dev" ADD "userId" varchar2(36) NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_fae92d2ac25104bc3c8c685b34" ON "followers_dev" ("followerId", "userId")`);
    }

}
