import { EventStorePublisher } from '@debens/event-sourcing';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateIdentity } from '../commands/create-identity.command';
import { IdentityRepository } from '../identity.repository';

@CommandHandler(CreateIdentity)
export class CreateIdentityHandler implements ICommandHandler<CreateIdentity, unknown> {
    @Inject(IdentityRepository)
    private readonly identities!: IdentityRepository;

    @Inject(EventStorePublisher)
    private readonly publisher!: EventStorePublisher;

    async execute(command: CreateIdentity): Promise<void> {
        const identity = this.publisher.mergeObjectContext(await this.identities.findById(command.id));

        await identity.create(command);
        await identity.commit();
    }
}
