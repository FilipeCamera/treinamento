import {
  Entity, 
  PrimaryGeneratedColumn, 
  CreateDateColumn, 
  UpdateDateColumn, 
  Column,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

import Message from './Message';

import bcrypt from 'bcryptjs';

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

  @BeforeInsert()
  @BeforeUpdate()
  hashSenha(){
    this.senha = bcrypt.hashSync(this.senha, 8)
  }

  
}

export default User;

