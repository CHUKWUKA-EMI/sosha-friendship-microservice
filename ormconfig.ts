/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { Followers } from 'src/friendship/entities/followers.entity';
import { FriendShip } from 'src/friendship/entities/friendship.entity';

config();

const walletFolder = './oracleWallet/';
const CONN_STRING = `${process.env.ORACLE_CONN_STRING}?wallet_location=${walletFolder}`;

const ORMCONFIG: TypeOrmModuleOptions = {
  type: 'oracle',
  connectString: CONN_STRING,
  username: 'Admin',
  password: process.env.DB_PASSWORD,
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
