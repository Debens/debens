import { Inject } from '@nestjs/common';
import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { WebAuthnCredential } from '@teamhanko/hanko-node';

import { AttestationService } from '../../hanko/services/attestation.service';
import { CreateIdentity } from '../../identity/commands/create-identity.command';
import { CompleteAttestation } from '../commands/complete-attestation.command';

@CommandHandler(CompleteAttestation)
export class CompleteAttestationHandler implements ICommandHandler<CompleteAttestation, WebAuthnCredential> {
    @Inject(CommandBus)
    private readonly commands!: CommandBus;

    @Inject(AttestationService)
    private readonly attestation!: AttestationService;

    async execute(command: CompleteAttestation): Promise<WebAuthnCredential> {
        const { credential } = await this.attestation.complete(command);

        await this.commands.execute(
            new CreateIdentity({
                id: credential.user.id,
                email: credential.name,
            }),
        );

        return credential;
    }
}
