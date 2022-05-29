import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateFriendshipDto {
  @IsNotEmpty()
  @IsUUID(4)
  userId: string;

  @IsNotEmpty()
  @IsUUID(4)
  friendId: string;

  @IsNotEmpty()
  @IsString()
  friendFirstName: string;

  @IsNotEmpty()
  @IsString()
  friendLastName: string;

  @IsNotEmpty()
  @IsString()
  friendUserName: string;

  @IsOptional()
  @IsString()
  friendImageUrl?: string;
}
