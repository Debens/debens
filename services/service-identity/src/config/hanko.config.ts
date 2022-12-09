import { registerAs } from '@nestjs/config';

export default registerAs('hanko', () => ({
    apiUrl: process.env.HANKO_API_URL!,
    apiSecret: process.env.HANKO_API_SECRET!,
    apiKeyId: process.env.HANKO_API_KEY_ID!,
}));
