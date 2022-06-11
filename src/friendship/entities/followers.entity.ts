/* eslint-disable prettier/prettier */
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'followers'})
export class Followers {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Index()
  @Column({type:"varchar", nullable: false })
  userId: string;

  @Index()
  @Column({type:"varchar", nullable: false })
  followerId: string;
}
