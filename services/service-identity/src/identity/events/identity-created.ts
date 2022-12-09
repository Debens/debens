import { StorableEvent } from '@debens/event-sourcing';

type IdentityCreatedData = {
    email: string;
};

export class IdentityCreated extends StorableEvent<IdentityCreatedData> {
    constructor(public readonly id: string, public readonly data: IdentityCreatedData) {
        super(id, 'identity');
    }
}
