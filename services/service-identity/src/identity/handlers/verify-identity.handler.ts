import { EventStorePublisher } from '@debens/event-sourcing';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { VerifyIdentity } from '../commands/verify-identity.command';
import { IdentityRepository } from '../identity.repository';

@CommandHandler(VerifyIdentity)
export class VerifyIdentityHandler implements ICommandHandler<VerifyIdentity, unknown> {
    @Inject(IdentityRepository)
    private readonly identities!: IdentityRepository;

    @Inject(EventStorePublisher)
    private readonly publisher!: EventStorePublisher;

    async execute(command: VerifyIdentity): Promise<void> {
        const identity = this.publisher.mergeObjectContext(await this.identities.findById(command.identity));

        await identity.verify(command);
        await identity.commit();
    }
}
