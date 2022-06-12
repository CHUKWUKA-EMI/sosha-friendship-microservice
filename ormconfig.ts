/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { Followers } from 'src/friendship/entities/followers.entity';
import { FriendShip } from 'src/friendship/entities/friendship.entity';

config();

const ORMCONFIG: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: true,
  synchronize: false,
  logging: true,
  migrationsRun: false,
  entities: [FriendShip, Followers],
  migrations: ['dist/src/migration/*.js'],
  cli: {
    migrationsDir: 'src/migration',
  },
};

export default ORMCONFIG;
