import { Aggregate } from '@debens/event-sourcing';
import { Injectable } from '@nestjs/common';

import { CreateIdentity } from './commands/create-identity.command';
import { VerifyIdentity } from './commands/verify-identity.command';
import { IdentityCreated } from './events/identity-created';
import { IdentityVerified } from './events/identity-verified';

interface State {
    readonly id: string;
    readonly email: string;
    readonly createdOn: Date;
}

@Injectable()
export class IdentityAggregate extends Aggregate implements State {
    id!: string;
    email!: string;
    createdOn!: Date;

    constructor(state?: State) {
        super();

        Object.assign(this, state);
    }

    async create(command: CreateIdentity) {
        if (!this.isNew) {
            throw new Error('identity already exists');
        }

        this.apply(new IdentityCreated(command.id, { email: command.email }));
    }

    async verify(command: VerifyIdentity) {
        this.apply(new IdentityVerified(command.identity));
    }

    onIdentityCreated(event: IdentityCreated) {
        this.id = event.id;
        this.email = event.data.email;
        this.createdOn = event.metadata.timestamp;
    }
}
