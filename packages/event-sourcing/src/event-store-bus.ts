import { Inject, Injectable } from '@nestjs/common';
import { EventBus, IEvent } from '@nestjs/cqrs';

import { EventStore, IWriteOptions } from './event-store';
import { StorableEvent } from './storeable-event';

@Injectable()
export class EventStoreBus {
    @Inject(EventStore)
    private readonly store!: EventStore;

    @Inject(EventBus)
    private readonly eventBus!: EventBus;

    async publish(event: IEvent, options: IWriteOptions) {
        return StorableEvent.isStorable(event)
            ? this.store.write([event], options).then(this.eventBus.publish.bind(this.eventBus))
            : this.eventBus.publish(event);
    }

    publishAll(events: IEvent[], options: IWriteOptions) {
        console.warn(events, options);
        /* TODO: handle unstorable events */
        return this.store
            .write(events.filter(StorableEvent.isStorable), options)
            .then(this.eventBus.publish.bind(this.eventBus));
    }
}
