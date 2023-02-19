import { EventStorePublisher } from '@debens/event-sourcing';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { RegisterCredentials } from '../commands/register-credentials.command';
import { IdentityRepository } from '../identity.repository';

@CommandHandler(RegisterCredentials)
export class RegisterCredentialsHandler implements ICommandHandler<RegisterCredentials, unknown> {
    @Inject(IdentityRepository)
    private readonly identities!: IdentityRepository;

    @Inject(EventStorePublisher)
    private readonly publisher!: EventStorePublisher;

    async execute(command: RegisterCredentials): Promise<any> {
        const identity = this.publisher.mergeObjectContext(await this.identities.findById(command.identity));

        const response = await identity.register(command);
        await identity.commit();

        return response;
    }
}
