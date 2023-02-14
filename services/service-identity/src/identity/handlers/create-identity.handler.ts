import { EventStorePublisher } from '@debens/event-sourcing';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { HankoAdminService } from '../../hanko/services/hank-admin.service';
import { CreateIdentity } from '../commands/create-identity.command';
import { IdentityRepository } from '../identity.repository';

@CommandHandler(CreateIdentity)
export class CreateIdentityHandler implements ICommandHandler<CreateIdentity, unknown> {
    @Inject(IdentityRepository)
    private readonly identities!: IdentityRepository;

    @Inject(EventStorePublisher)
    private readonly publisher!: EventStorePublisher;

    @Inject(HankoAdminService)
    private readonly hanko!: HankoAdminService;

    async execute(command: CreateIdentity) {
        const id = await this.hanko.getUserByEmail(command.email).catch((error: any) => {
            if (error?.response?.status !== 404) {
                throw new InternalServerErrorException();
            }
        });

        const identity = this.publisher.mergeObjectContext(await this.identities.findById(id));

        await identity.create(command);
        await identity.commit();

        return identity;
    }
}
