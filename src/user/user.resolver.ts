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
  ) {
  }

  @Query()
  async getUsers() {
    return await this.userService.findAll();
  }

  @Query('user')
  async findOneById(
    @Args('id', ParseIntPipe)
    id: number,
  ): Promise<User> {
    return await this.userService.findOneById(id);
  }

  @Mutation('createUser')
  async create(@Args('createUserInput') args: CreateUserDto): Promise<void> {
    const createdUser = await this.userService.create(args);
    this.pubSub.publish('userCreated', { userCreated: createdUser });
  }

  @Subscription('userCreated')
  userCreated() {
    return {
      subscribe: () => this.pubSub.asyncIterator('userCreated'),
    };
  }
}
