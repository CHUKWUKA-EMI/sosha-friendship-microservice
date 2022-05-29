import { Injectable, Logger } from '@nestjs/common';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { FriendShip } from './entities/friendship.entity';
import { RpcException } from '@nestjs/microservices';
import { FriendshipStatus } from './enums/friendship.enums';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Followers } from './entities/followers.entity';
import {
  FriendShips,
  GetFollowersInput,
} from './interfaces/friendship.interfaces';

const logger = new Logger('FriendshipService');

@Injectable()
export class FriendshipService {
  constructor(
    @InjectRepository(FriendShip)
    private readonly friendshipRepository: Repository<FriendShip>,
    @InjectRepository(Followers)
    private readonly followersRepo: Repository<Followers>,
  ) {}

  async follow(createFriendshipDto: CreateFriendshipDto): Promise<FriendShip> {
    try {
      //create a new friendship
      const payload = {
        ...createFriendshipDto,
        friendshipStatus: FriendshipStatus.FOLLOWED,
      };

      const friendshipObj = this.friendshipRepository.create({
        userId: payload.userId,
        friendId: payload.friendId,
        friendFirstName: payload.friendFirstName,
        friendLastName: payload.friendLastName,
        friendUserName: payload.friendUserName,
        friendshipStatus: FriendshipStatus.FOLLOWED,
        friendImageUrl: payload.friendImageUrl,
      });
      const newFriendship = await this.friendshipRepository.save(friendshipObj);
      //create followership record
      const followership = this.followersRepo.create({
        userId: createFriendshipDto.friendId,
        followerId: createFriendshipDto.userId,
      });
      await this.followersRepo.save(followership);
      return newFriendship;
    } catch (error) {
      logger.log('server error', error);
      throw new RpcException(error);
    }
  }

  async followBack(friendshipId: number): Promise<FriendShip> {
    try {
      //check if the current user has been followed by the target friend
      const friendship = await this.friendshipRepository.findOne({
        where: { id: friendshipId },
      });
      if (friendship) {
        //follow back
        friendship.friendshipStatus = FriendshipStatus.FOLLOWED_BACK;
        const updatedFriendship = await this.friendshipRepository.save(
          friendship,
        );
        //create followership record
        const followership = this.followersRepo.create({
          userId: friendship.userId,
          followerId: friendship.friendId,
        });
        await this.followersRepo.save(followership);
        return updatedFriendship;
      }
    } catch (error) {
      logger.log('server error', error);
      throw new RpcException(error);
    }
  }

  async findAllConnections({
    page = 1,
    limit = 20,
    userId,
  }: GetFollowersInput): Promise<FriendShips> {
    try {
      const offset = (page - 1) * limit;
      const connections = await this.friendshipRepository
        .createQueryBuilder('friendship')
        .take(limit)
        .skip(offset)
        .where('friendship.userId = :userId', { userId })
        .orWhere('friendship.friendId = :friendId', { friendId: userId })
        .getMany();
      const totalConnections = await this.friendshipRepository
        .createQueryBuilder('friendship')
        .where('friendship.userId = :userId', { userId })
        .orWhere('friendship.friendId = :friendId', { friendId: userId })
        .getCount();

      const totalPages = Math.ceil(totalConnections / limit);
      const hasPrevious = page > 1;
      const hasNext = page < totalPages;

      const resData: FriendShips = {
        data: connections,
        currentPage: page,
        size: connections.length,
        totalPages,
        hasPrevious,
        hasNext,
      };
      return resData;
    } catch (error) {
      logger.log('server error', error);
      throw new RpcException(error);
    }
  }

  async findOneConnection(friendshipId: number): Promise<FriendShip> {
    try {
      const connection = await this.friendshipRepository.findOne({
        where: { id: friendshipId },
      });
      if (!connection) {
        throw new Error('Connection not found');
      }

      return connection;
    } catch (error) {
      logger.log('server error', error);
      throw new RpcException(error);
    }
  }

  async getFollowersCount(userId: string): Promise<number> {
    try {
      const followersCount = await this.followersRepo
        .createQueryBuilder('f')
        .where('f.userId = :userId', { userId })
        .getCount();
      return followersCount;
    } catch (error) {
      logger.log('server error', error);
      throw new RpcException(error);
    }
  }

  async getFollowingCount(userId: string): Promise<number> {
    try {
      const followingCount = await this.followersRepo
        .createQueryBuilder('f')
        .where('f.followerId = :followerId', { followerId: userId })
        .getCount();
      return followingCount;
    } catch (error) {
      logger.log('server error', error);
      throw new RpcException(error);
    }
  }

  async blacklistFollower(friendshipId: number): Promise<FriendShip> {
    try {
      const friendship = await this.friendshipRepository.findOne({
        where: { id: friendshipId },
      });

      if (!friendship) {
        throw new RpcException('connection not found');
      }
      friendship.friendshipStatus = FriendshipStatus.BLACKLISTED;

      return await this.friendshipRepository.save(friendship);
    } catch (error) {
      logger.log('server error', error);
      throw new RpcException(error);
    }
  }

  async whitelistFollower(friendshipId: number): Promise<FriendShip> {
    try {
      const friendship = await this.friendshipRepository.findOne({
        where: { id: friendshipId },
      });

      if (!friendship) {
        throw new RpcException('connection not found');
      }
      friendship.friendshipStatus = FriendshipStatus.FOLLOWED_BACK;

      return await this.friendshipRepository.save(friendship);
    } catch (error) {
      logger.log('server error', error);
      throw new RpcException(error);
    }
  }

  async updateLastMessage(id: number, message: string): Promise<FriendShip> {
    try {
      const friendship = await this.friendshipRepository.findOne({
        where: { id },
      });

      if (!friendship) {
        throw new RpcException('connection not found');
      }

      friendship.lastMessage = message;

      return await this.friendshipRepository.save(friendship);
    } catch (error) {
      logger.log('server error', error);
      throw new RpcException(error);
    }
  }
}
