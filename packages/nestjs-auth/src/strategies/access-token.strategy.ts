import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import authConfig from '../auth.config';

type JwtPayload = {
    sub: string;
    username: string;
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(@Inject(authConfig.KEY) config: ConfigType<typeof authConfig>) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                AccessTokenStrategy.fromCookie,
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            ]),
            secretOrKey: config.access.secret,
        });
    }

    private static fromCookie(request: Request) {
        return request.cookies?.['debens'] ?? null;
    }

    validate(payload: JwtPayload) {
        if (!payload.sub) {
            throw new UnauthorizedException();
        }

        return payload;
    }
}
