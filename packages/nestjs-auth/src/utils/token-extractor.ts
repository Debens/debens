import { Request } from 'express';
import { ExtractJwt } from 'passport-jwt';

const fromCookie = (name: string) => (request: Request) => request.cookies?.[name] ?? null;

export const getTokenFromRequest = ExtractJwt.fromExtractors([
    ExtractJwt.fromAuthHeaderAsBearerToken(),
    fromCookie('debens'),
]);
