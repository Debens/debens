import { EventStorePublisher } from '@debens/event-sourcing';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ChallengeIdentity } from '../commands/challenge-identity.command';
import { IdentityRepository } from '../identity.repository';

@CommandHandler(ChallengeIdentity)
export class ChallengeIdentityHandler implements ICommandHandler<ChallengeIdentity, unknown> {
    @Inject(IdentityRepository)
    private readonly identities!: IdentityRepository;

    @Inject(EventStorePublisher)
    private readonly publisher!: EventStorePublisher;

    async execute(command: ChallengeIdentity): Promise<any> {
        const identity = this.publisher.mergeObjectContext(await this.identities.findById(command.identity));

        const challenge = await identity.challenge(command);
        await identity.commit();

        return challenge;
    }
}
