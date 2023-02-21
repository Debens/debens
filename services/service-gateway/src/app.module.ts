import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

import { ClsModule } from 'nestjs-cls';

import UserModule from './user/user.module';
import { WellKnownModule } from './well-known/well-known.module';

@Module({
    imports: [
        ClsModule.forRoot({ middleware: { mount: true } }),
        ConfigModule.forRoot(),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            debug: Boolean(process.env.DEBUG),
            playground: Boolean(process.env.PLAYGROUND_ENABLED),
            autoSchemaFile: true,
        }),
        UserModule,
        WellKnownModule,
    ],
})
export default class AppModule {}
