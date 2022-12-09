import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import authConfig from '../config/auth.config';

import { AuthService } from './auth.service';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';

@Module({
    imports: [ConfigModule.forFeature(authConfig), JwtModule.register({})],
    providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
    exports: [AuthService],
})
export class AuthModule {}
