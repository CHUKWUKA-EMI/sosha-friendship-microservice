import { Module } from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import { FriendshipController } from './friendship.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendShip } from './entities/friendship.entity';
import { Followers } from './entities/followers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FriendShip, Followers])],
  controllers: [FriendshipController],
  providers: [FriendshipService],
})
export class FriendshipModule {}
