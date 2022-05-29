/* eslint-disable prettier/prettier */
import { FriendShip } from '../entities/friendship.entity';

export interface FriendShips {
  data: FriendShip[];
  currentPage: number;
  size: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface GetFollowersInput {
  userId: string;
  page: number;
  limit: number;
}

export interface LastMessageUpdatePayload {
  friendshipId: number;
  message: string;
}
