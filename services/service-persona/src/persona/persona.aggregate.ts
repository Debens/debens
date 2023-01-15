import { Aggregate } from '@debens/event-sourcing';
import { IdentityService } from '@debens/service-identity';
import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';

import { CreatePersona } from './commands/create-persona.command';
import { PersonaCreated } from './events/persona-created';

export type PersonaState = Partial<{
    id: string;
    name: string;
    createdOn: Date;
}>;

@Injectable()
export class PersonaAggregate extends Aggregate {
    state: PersonaState = {};

    constructor(private readonly identity: IdentityService, state?: PersonaState) {
        super();

        Object.assign(this, state);
    }

    async create(command: CreatePersona) {
        if (!this.isNew) {
            throw new ConflictException(`persona ${command.id} already exists`);
        }

        await this.identity.get(command.identity).catch(() => {
            throw new BadRequestException(`identity '${command.identity}' does not exist`);
        });

        this.apply(
            new PersonaCreated(command.id, {
                name: command.name,
                identity: command.identity,
            }),
        );
    }

    onPersonaCreated(event: PersonaCreated) {
        this.state.id = event.id;
        this.state.name = event.data.name;
        this.state.createdOn = event.metadata.timestamp;
    }
}
