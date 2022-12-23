import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
    access: {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiry: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
    },
    refresh: {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiry: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
    },
}));
