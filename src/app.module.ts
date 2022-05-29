import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllHttpExceptionsFilter } from 'all-http-exceptions-filter';
import ORMCONFIG from 'ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FriendshipModule } from './friendship/friendship.module';

@Module({
  imports: [TypeOrmModule.forRoot(ORMCONFIG), FriendshipModule],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: AllHttpExceptionsFilter },
  ],
})
export class AppModule {}
