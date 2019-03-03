import { Injectable } from '@nestjs/common';
import { User, CreateUserDto } from './user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
  }

  create(user: CreateUserDto): User {
    const newUser = new User(user);
    this.userRepository.insert(newUser);
    return newUser;
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOneById(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }
}
