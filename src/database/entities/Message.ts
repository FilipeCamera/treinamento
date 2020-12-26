import {
  Entity, 
  PrimaryGeneratedColumn, 
  CreateDateColumn, 
  UpdateDateColumn, 
  Column,
  ManyToOne
} from 'typeorm';

import User from './User';

@Entity('messages')
class Message {
  @PrimaryGeneratedColumn('uuid')
  id !: string;

  @Column({nullable: false})
  title !: string;

  @Column({nullable: false})
  desc !: string;

  @ManyToOne(type => User, message => Message, {cascade: true})
  user !: User;

  @CreateDateColumn({nullable: false, name: 'created_at'})
  createdAt !: string;

  @UpdateDateColumn({nullable: false, name: 'updated_at', update: true})
  updatedAt !: string;
}

export default Message;