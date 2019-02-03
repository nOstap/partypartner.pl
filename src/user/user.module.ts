import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PubSub } from 'graphql-subscriptions';

@Module({
  providers: [
    UserService,
    UserResolver,
    PubSub,
  ],
})
export class UserModule {}
