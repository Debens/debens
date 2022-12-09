import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CredentialRequestOptions } from '@teamhanko/hanko-node';

import * as uuid from 'uuid';

import { AssertionService } from '../../hanko/services/assertion.service';
import { Assert } from '../commands/assert.command';

@CommandHandler(Assert)
export class AssertHandler implements ICommandHandler<Assert, CredentialRequestOptions> {
    @Inject(AssertionService)
    private readonly assertion!: AssertionService;

    async execute(command: Assert): Promise<CredentialRequestOptions> {
        /* FIXME: get identity from db */
        const id = uuid.v5(command.email, '75e9e968-c000-4ed5-b341-1e186f1e871a');

        return await this.assertion.challenge(id);
    }
}
