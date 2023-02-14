import { StorableEvent } from '@debens/event-sourcing';
import { JSONType } from '@eventstore/db-client';

export class DeviceVerified extends StorableEvent {
    data: JSONType = {};

    constructor(public readonly id: string) {
        super(id, 'identity');
    }
}
