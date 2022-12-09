import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import authConfig from '../../config/auth.config';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(@Inject(authConfig.KEY) config: ConfigType<typeof authConfig>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.refresh.secret,
            passReqToCallback: true,
        });
    }

    validate(_req: Request, payload: any) {
        // const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
        return { ...payload };
    }
}
