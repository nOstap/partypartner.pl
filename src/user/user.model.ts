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
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  group: Group;
  constructor(data: CreateUserDto) {
    Object.assign(this, data);
  }
}