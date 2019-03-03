import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
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
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
      definitions: {
        path: join(process.cwd(), 'src/graphql.schema.ts'),
        outputAs: 'interface',
      },
    }),
  ],
  providers: [PubSub],
})
export class AppModule {}
