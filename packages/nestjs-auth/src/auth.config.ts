import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
    cache: process.env.AUTH_JWKS_CAHCE ? /^true$/i.test(process.env.AUTH_JWKS_CAHCE) : true,
    rateLimit: process.env.AUTH_JWKS_RATE_LIMIT ? /^true$/i.test(process.env.AUTH_JWKS_RATE_LIMIT) : true,
    jwksRequestsPerMinute: process.env.AUTH_JWKS_REQUEST_PER_MINUTE
        ? parseInt(process.env.AUTH_JWKS_REQUEST_PER_MINUTE)
        : 5,
    jwksUri: process.env.AUTH_JWKS_URL!,
}));
