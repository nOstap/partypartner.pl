import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, OneToOne } from 'typeorm';
import { User as IUser, CreateUserInput, Group } from '../graphql.schema';
import { MinLength, MaxLength } from 'class-validator';
export class CreateUserDto implements CreateUserInput {
  @MinLength(3)
  @MaxLength(50)
  name: string;
  @MinLength(3)
  @MaxLength(50)
  surname: string;
  @MinLength(6)
  email: string;
  @MinLength(8)
  password: string;
}

export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  @CreateDateColumn()
  created: Date;
  @UpdateDateColumn()
  updated: Date;
  @Column('text')
  email: string;
  @Column('text')
  name: string;
  @Column('text')
  surname: string;
  @Column('int')
  group: Group;
  constructor(data: CreateUserDto) {
    Object.assign(this, data);
  }
}