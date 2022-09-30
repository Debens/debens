import { EventStoreDBClient } from '@eventstore/db-client';
import { Inject } from '@nestjs/common';

export class EventStreams {
    @Inject(EventStoreDBClient)
    private readonly client!: EventStoreDBClient;

    async *read(aggregate: string, id: string) {
        const events = this.client.readStream(`${aggregate}-${id}`);

        for await (const { event } of events) {
            yield Object.assign(Object.create({ constructor: { name: event?.type } }), {
                id: event?.id,
                type: event?.type,
                data: event?.data,
                metadata: event?.metadata,
            });
        }
    }
}