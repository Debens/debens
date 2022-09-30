import { StorableEvent } from '@debens/event-sourcing';

type IdentityVerifiedData = {};

export class IdentityVerified extends StorableEvent<IdentityVerifiedData> {
    constructor(public readonly id: string, public readonly data: IdentityVerifiedData = {}) {
        super(id, 'identity');
    }
}
