import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import authConfig from './auth.config';
import { AccessTokenStrategy } from './strategies/access-token.strategy';

@Module({
    imports: [ConfigModule.forFeature(authConfig)],
    providers: [AccessTokenStrategy],
})
export class AuthModule {}
