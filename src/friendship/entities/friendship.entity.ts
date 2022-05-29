import { IsUrl } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'friendship' })
export class FriendShip {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Index()
  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @Index()
  @Column({ type: 'uuid', nullable: false })
  friendId: string;

  @Column({ type: 'varchar', nullable: false })
  friendFirstName: string;

  @Column({ type: 'varchar', nullable: false })
  friendLastName: string;

  @Column({ type: 'varchar', nullable: false })
  friendUserName: string;

  @IsUrl()
  @Column({ type: 'varchar', nullable: true })
  friendImageUrl?: string;

  @Column({ type: 'varchar', nullable: false })
  friendshipStatus: string;

  @Column({ type: 'varchar', nullable: true })
  lastMessage?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
