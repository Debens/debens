import { registerAs } from '@nestjs/config';

export default registerAs('identity', () => ({
    url: process.env.IDENTITY_URL!,
}));
