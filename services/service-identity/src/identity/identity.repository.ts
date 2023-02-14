import { EventStreams } from '@debens/event-sourcing';
import { Inject, Injectable } from '@nestjs/common';

import { IdentityAggregate } from './identity.aggregate';
import { IdentityFactory } from './identity.factory';

@Injectable()
export class IdentityRepository {
    @Inject(EventStreams)
    private readonly streams!: EventStreams;

    @Inject(IdentityFactory)
    public readonly factory!: IdentityFactory;

    async findById(id: string): Promise<IdentityAggregate> {
        const aggregate = this.factory.create();

        if (id)
            for await (const event of this.streams.read('identity', id)) {
                aggregate.raise(event);
            }

        return aggregate;
    }
}
