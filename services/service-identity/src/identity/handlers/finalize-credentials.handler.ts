import { EventStorePublisher } from '@debens/event-sourcing';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { FinalizeCredentials } from '../commands/finalize-credentials.command';
import { IdentityRepository } from '../identity.repository';

@CommandHandler(FinalizeCredentials)
export class FinalizeCredentialsHandler implements ICommandHandler<FinalizeCredentials, unknown> {
    @Inject(IdentityRepository)
    private readonly identities!: IdentityRepository;

    @Inject(EventStorePublisher)
    private readonly publisher!: EventStorePublisher;

    async execute(command: FinalizeCredentials): Promise<any> {
        const identity = this.publisher.mergeObjectContext(await this.identities.findById(command.identity));

        await identity.finalize(command);
        await identity.commit();
    }
}
