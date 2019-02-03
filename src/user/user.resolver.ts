import { ParseIntPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { CreateUserDto, User } from './user.model';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly pubSub: PubSub,
  ) {}

  @Query()
  async getUsers() {
    const users = await this.userService.findAll();
    console.log(users, 'getUsers()');
    return users;
  }

  @Query('user')
  async findOneById(
    @Args('id', ParseIntPipe)
    id: number,
  ): Promise<User> {
    return await this.userService.findOneById(id);
  }

  @Mutation('createUser')
  async create(@Args('createUserInput') args: CreateUserDto): Promise<boolean> {
    const createdUser = await this.userService.create(args);
    this.pubSub.publish('userCreated', { userCreated: createdUser });
    return !!createdUser;
  }

  @Subscription('userCreated')
  userCreated() {
    return {
      subscribe: () => this.pubSub.asyncIterator('userCreated'),
    };
  }
}
