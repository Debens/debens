import { Inject, Injectable } from '@nestjs/common';

import { Aggregate } from './aggregate';
import { EventStoreBus } from './event-store-bus';

export interface Constructor<T> {
    new (...args: any[]): T;
}

@Injectable()
export class EventStorePublisher {
    @Inject(EventStoreBus)
    private readonly eventBus!: EventStoreBus;

    mergeClassContext<T extends Constructor<Aggregate>>(metatype: T): T {
        const eventBus = this.eventBus;
        return class extends metatype {
            commit() {
                return eventBus.publishAll(this.uncommited, { revision: this.history.length });
            }
        };
    }

    mergeObjectContext<T extends Aggregate>(object: T) {
        const eventBus = this.eventBus;
        return Object.assign(object, {
            commit() {
                return eventBus.publishAll(object.uncommited, { revision: object.history.length });
            },
        });
    }
}
