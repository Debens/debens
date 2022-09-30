import { Inject } from '@nestjs/common';
import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { WebAuthnCredential } from '@teamhanko/hanko-node';

import { AssertionService } from '../../hanko/services/assertion.service';
import { VerifyIdentity } from '../../identity/commands/verify-identity.command';
import { CompleteAssertion } from '../commands/complete-assertion.command';

@CommandHandler(CompleteAssertion)
export class CompleteAssertionHandler implements ICommandHandler<CompleteAssertion, WebAuthnCredential> {
    @Inject(CommandBus)
    private readonly commands!: CommandBus;

    @Inject(AssertionService)
    private readonly assertion!: AssertionService;

    async execute(command: CompleteAssertion): Promise<WebAuthnCredential> {
        const { credential } = await this.assertion.verify(command);

        await this.commands.execute(new VerifyIdentity({ identity: credential.user.id }));

        return credential;
    }
}
