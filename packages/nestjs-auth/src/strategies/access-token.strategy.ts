import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { passportJwtSecret } from 'jwks-rsa';
import { Strategy } from 'passport-jwt';

import authConfig from '../auth.config';
import { getTokenFromRequest } from '../utils/token-extractor';

type JwtPayload = {
    sub: string;
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(@Inject(authConfig.KEY) config: ConfigType<typeof authConfig>) {
        super({
            jwtFromRequest: getTokenFromRequest,
            secretOrKeyProvider: passportJwtSecret(config),
        });
    }

    validate(payload: JwtPayload) {
        if (!payload.sub) {
            throw new UnauthorizedException();
        }

        return payload;
    }
}
