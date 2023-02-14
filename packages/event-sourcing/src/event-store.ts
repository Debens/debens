import { EventStoreDBClient, jsonEvent, JSONType, NO_STREAM } from '@eventstore/db-client';
import { Inject, Injectable } from '@nestjs/common';

import { StorableEvent } from './storeable-event';

export interface IWriteOptions {
    revision: number;
}

@Injectable()
export class EventStore {
    @Inject(EventStoreDBClient)
    private readonly client!: EventStoreDBClient;

    write = <Data extends JSONType = JSONType>(events: StorableEvent<Data>[], options: IWriteOptions) => {
        return this.client.appendToStream(
            events[0]!.stream,
            events.map(event =>
                jsonEvent({
                    id: event.id,
                    type: event.type,
                    data: event.data,
                    metadata: event.metadata,
                }),
            ),
            { expectedRevision: options.revision ? BigInt(options.revision - 1) : NO_STREAM },
        );
    };
}
