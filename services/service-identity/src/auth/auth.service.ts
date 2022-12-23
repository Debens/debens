import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import authConfig from '../config/auth.config';

@Injectable()
export class AuthService {
    @Inject(JwtService)
    private readonly jwtService!: JwtService;

    @Inject(authConfig.KEY) config!: ConfigType<typeof authConfig>;

    getAccessToken(user: string) {
        return this.jwtService.sign(
            { sub: user },
            {
                secret: this.config.access.secret,
                expiresIn: `${this.config.access.expiry}s`,
            },
        );
    }

    getRefreshToken(user: string) {
        return this.jwtService.sign(
            { sub: user },
            {
                secret: this.config.refresh.secret,
                expiresIn: `${this.config.refresh.expiry}s`,
            },
        );
    }
}
