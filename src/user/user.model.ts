import { User as IUser, CreateUserInput, Group } from '../graphql.schema';
import { MinLength, MaxLength } from 'class-validator';
import { Inject } from '@nestjs/common';

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
  name: string;
  surname: string;
  email: string;
  password: string;
  group: Group;
  constructor(data: CreateUserDto, public id: number) {
    Object.assign(this, data);
  }
}