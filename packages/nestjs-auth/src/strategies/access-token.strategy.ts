import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

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
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.access.secret,
        });
    }

    validate(payload: JwtPayload) {
        if (!payload.sub) {
            throw new UnauthorizedException();
        }

        return payload;
    }
}
