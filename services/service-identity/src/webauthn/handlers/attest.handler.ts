import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CredentialCreationOptions } from '@teamhanko/hanko-node';

import * as uuid from 'uuid';

import { AttestationService } from '../../hanko/services/attestation.service';
import { Attest } from '../commands/attest.command';

@CommandHandler(Attest)
export class AttestHandler implements ICommandHandler<Attest, CredentialCreationOptions> {
    @Inject(AttestationService)
    private readonly attestation!: AttestationService;

    async execute(command: Attest): Promise<CredentialCreationOptions> {
        return await this.attestation.create({
            id: uuid.v5(command.email, '75e9e968-c000-4ed5-b341-1e186f1e871a'),
            name: command.email,
        });
    }
}
