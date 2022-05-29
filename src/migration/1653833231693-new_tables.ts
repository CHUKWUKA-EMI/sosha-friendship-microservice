import {MigrationInterface, QueryRunner} from "typeorm";

export class newTables1653833231693 implements MigrationInterface {
    name = 'newTables1653833231693'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "followers" ("id" SERIAL NOT NULL, "userId" character varying NOT NULL, "followerId" character varying NOT NULL, CONSTRAINT "PK_c90cfc5b18edd29bd15ba95c1a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d052aca09cecd2e9b8b94e3c67" ON "followers" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_451bb9eb792c3023a164cf14e0" ON "followers" ("followerId") `);
        await queryRunner.query(`CREATE TABLE "friendship" ("id" SERIAL NOT NULL, "userId" uuid NOT NULL, "friendId" uuid NOT NULL, "friendFirstName" character varying NOT NULL, "friendLastName" character varying NOT NULL, "friendUserName" character varying NOT NULL, "friendImageUrl" character varying, "friendshipStatus" character varying NOT NULL, "lastMessage" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_dbd6fb568cd912c5140307075cc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_303e50cd29767b99cc55ab45c1" ON "friendship" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9372d39ed9833c770cb6d2c5cd" ON "friendship" ("friendId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_9372d39ed9833c770cb6d2c5cd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_303e50cd29767b99cc55ab45c1"`);
        await queryRunner.query(`DROP TABLE "friendship"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_451bb9eb792c3023a164cf14e0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d052aca09cecd2e9b8b94e3c67"`);
        await queryRunner.query(`DROP TABLE "followers"`);
    }

}
