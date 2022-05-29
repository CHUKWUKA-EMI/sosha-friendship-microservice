import { Controller, UseFilters } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FriendshipService } from './friendship.service';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
import {
  GetFollowersInput,
  LastMessageUpdatePayload,
} from './interfaces/friendship.interfaces';
import { AllRPCExceptionsFilter } from 'all-rpc-exceptions.filter';

@Controller()
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) {}

  @UseFilters(new AllRPCExceptionsFilter())
  @MessagePattern({ role: 'friendship', cmd: 'follow' })
  follow(@Payload() createFriendshipDto: CreateFriendshipDto) {
    return this.friendshipService.follow(createFriendshipDto);
  }

  @UseFilters(new AllRPCExceptionsFilter())
  @MessagePattern({ role: 'friendship', cmd: 'followBack' })
  followBack(@Payload() friendshipId: number) {
    return this.friendshipService.followBack(friendshipId);
  }

  @UseFilters(new AllRPCExceptionsFilter())
  @MessagePattern({ role: 'friendship', cmd: 'findAll' })
  findAll(@Payload() input: GetFollowersInput) {
    return this.friendshipService.findAllConnections(input);
  }

  @UseFilters(new AllRPCExceptionsFilter())
  @MessagePattern({ role: 'friendship', cmd: 'findOne' })
  findOne(@Payload() friendshipId: number) {
    return this.friendshipService.findOneConnection(friendshipId);
  }

  @UseFilters(new AllRPCExceptionsFilter())
  @MessagePattern({ role: 'friendship', cmd: 'getFollowersCount' })
  getFollowersCount(@Payload() userId: string) {
    return this.friendshipService.getFollowersCount(userId);
  }

  @UseFilters(new AllRPCExceptionsFilter())
  @MessagePattern({ role: 'friendship', cmd: 'getFollowingCount' })
  getFollowingCount(@Payload() userId: string) {
    return this.friendshipService.getFollowingCount(userId);
  }

  @UseFilters(new AllRPCExceptionsFilter())
  @MessagePattern({ role: 'friendship', cmd: 'blacklist' })
  blacklist(@Payload() friendshipId: number) {
    return this.friendshipService.blacklistFollower(friendshipId);
  }

  @UseFilters(new AllRPCExceptionsFilter())
  @MessagePattern({ role: 'friendship', cmd: 'whitelist' })
  whitelist(@Payload() friendshipId: number) {
    return this.friendshipService.whitelistFollower(friendshipId);
  }

  @UseFilters(new AllRPCExceptionsFilter())
  @MessagePattern({ role: 'friendship', cmd: 'updateLastMessage' })
  updateLastMessage(@Payload() updatePayload: LastMessageUpdatePayload) {
    return this.friendshipService.updateLastMessage(
      updatePayload.friendshipId,
      updatePayload.message,
    );
  }
}
