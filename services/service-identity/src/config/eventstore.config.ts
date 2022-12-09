import { EventStoreConfig } from '@debens/event-sourcing';
import { registerAs } from '@nestjs/config';

export default registerAs<EventStoreConfig>('eventstore', () => ({
    host: process.env.EVENTSTORE_HOST || 'localhost',
    port: process.env.EVENTSTORE_PORT || 2113,
    insecure: !process.env.EVENSTORE_SECURE,
}));
