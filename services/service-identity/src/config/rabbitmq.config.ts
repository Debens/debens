import { registerAs } from '@nestjs/config';

export default registerAs('rabbitmq', () => ({
    user: process.env.RMQ_USER || process.env.RMQ_DEFAULT_USER || 'username',
    password: process.env.RMQ_PASS || process.env.RMQ_DEFAULT_PASS || 'password',
    host: process.env.RMQ_HOST || process.env.RMQ_DEFAULT_HOST || 'localhost',
    port: process.env.RMQ_PORT || process.env.RMQ_DEFAULT_PORT || 5672,
}));
