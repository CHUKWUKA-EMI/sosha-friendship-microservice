/* eslint-disable prettier/prettier */
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: process.env.NODE_ENV === 'production' ? 'followers' : 'followers_dev',
})
export class Followers {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Index()
  @Column({ nullable: false })
  userId: string;

  @Index()
  @Column({ nullable: false })
  followerId: string;
}
