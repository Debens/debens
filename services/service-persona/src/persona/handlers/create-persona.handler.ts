import { EventStorePublisher } from '@debens/event-sourcing';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreatePersona } from '../commands/create-persona.command';
import { PersonaRepository } from '../persona.repository';

@CommandHandler(CreatePersona)
export class CreatePersonaHandler implements ICommandHandler<CreatePersona, unknown> {
    @Inject(PersonaRepository)
    private readonly personas!: PersonaRepository;

    @Inject(EventStorePublisher)
    private readonly publisher!: EventStorePublisher;

    async execute(command: CreatePersona): Promise<void> {
        const persona = this.publisher.mergeObjectContext(await this.personas.findById(command.id));

        await persona.create(command);
        await persona.commit();
    }
}
