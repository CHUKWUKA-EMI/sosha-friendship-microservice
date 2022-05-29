import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { FriendshipStatus } from '../enums/friendship.enums';

export class UpdateFriendshipDto {
  @IsNotEmpty()
  @IsNumber()
  friendshipId: number;

  @IsNotEmpty()
  @IsEnum(FriendshipStatus)
  friendshipStatus: FriendshipStatus;
}
