import { Injectable } from '@nestjs/common';
import { User, CreateUserDto } from './user.model';

@Injectable()
export class UserService {
  private readonly users: User[] = [
    new User(
      {
        name: 'Adam',
        surname: 'Ostapkiewicz',
        email: 'a@b.cd',
        password: 'admin',
      },
      0,
    ),
  ];

  create(user: CreateUserDto): User {
    const newUser = new User(user, this.users.length);
    this.users.push(newUser);
    return newUser;
  }

  findAll(): User[] {
    return this.users;
  }

  findOneById(id: number): User {
    return this.users.find(user => user.id === id);
  }

  findOneByEmail(email: string): User {
    return this.users.find(user => user.email === email);
  }
}
