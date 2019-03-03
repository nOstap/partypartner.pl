import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { PubSub } from 'graphql-subscriptions';

@Module({
  imports: [
    UserModule.forRoot({
      providers: [PubSub],
    }),
    GraphQLModule.forRoot({
      include: [UserModule],
      installSubscriptionHandlers: true,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.schema.ts'),
        outputAs: 'interface',
      },
    }),
    TypeOrmModule.forRoot(),
  ],
  providers: [PubSub],
})
export class AppModule {}
