import { EventStreams } from '@debens/event-sourcing';
import { Inject, Injectable } from '@nestjs/common';

import { IdentityAggregate } from './identity.aggregate';

@Injectable()
export class IdentityRepository {
    @Inject(EventStreams)
    private readonly streams!: EventStreams;

    async findById(id: string): Promise<IdentityAggregate> {
        const aggregate = new IdentityAggregate();
        for await (const event of this.streams.read('identity', id)) {
            aggregate.raise(event);
        }

        return aggregate;
    }
}
