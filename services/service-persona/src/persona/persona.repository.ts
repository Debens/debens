import { EventStreams } from '@debens/event-sourcing';
import { Inject, Injectable } from '@nestjs/common';

import { PersonaAggregate } from './persona.aggregate';
import { PersonaFactory } from './persona.factory';

@Injectable()
export class PersonaRepository {
    @Inject(EventStreams)
    private readonly streams!: EventStreams;

    @Inject(PersonaFactory)
    private readonly factory!: PersonaFactory;

    async findById(id: string): Promise<PersonaAggregate> {
        const aggregate = this.factory.create();
        for await (const event of this.streams.read('persona', id)) {
            aggregate.raise(event);
        }

        return aggregate;
    }
}
