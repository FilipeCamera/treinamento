import { type } from 'os';
import {
  Entity, 
  PrimaryGeneratedColumn, 
  CreateDateColumn, 
  UpdateDateColumn, 
  Column,
  OneToMany
} from 'typeorm';

import Message from './Message';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id !: string;

  @Column({nullable: false, length: 80})
  name !: string;

  @Column({nullable: false, unique: true, length: 255})
  email !: string;

  @Column({nullable: false})
  senha !: string;

  @OneToMany(type => Message, user => User, {cascade: true})
  messages !: Message[];

  @CreateDateColumn({nullable: false, name: 'created_at'})
  createdAt !: Date;

  @UpdateDateColumn({nullable: false, name: 'updated_at', update: true})
  updatedAt !: Date;
}

export default User;

