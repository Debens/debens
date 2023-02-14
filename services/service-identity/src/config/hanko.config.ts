import { registerAs } from '@nestjs/config';

export default registerAs('hanko', () => ({
    adminUrl: process.env.HANKO_ADMIN_URL!,
    publicUrl: process.env.HANKO_PUBLIC_URL!,
    apiUrl: process.env.HANKO_API_URL!,
    apiSecret: process.env.HANKO_API_SECRET!,
    apiKeyId: process.env.HANKO_API_KEY_ID!,
}));
