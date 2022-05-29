import { IsUrl } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: process.env.NODE_ENV === 'production' ? 'friendship' : 'friendship_dev',
})
export class FriendShip {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Index()
  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @Index()
  @Column({ type: 'uuid', nullable: false })
  friendId: string;

  @Column({ nullable: false })
  friendFirstName: string;

  @Column({ nullable: false })
  friendLastName: string;

  @Column({ nullable: false })
  friendUserName: string;

  @IsUrl()
  @Column({ type: 'varchar', nullable: true })
  friendImageUrl?: string;

  @Column({
    nullable: false,
    type: 'varchar',
  })
  friendshipStatus: string;

  @Column({ type: 'varchar2', nullable: true })
  lastMessage?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
