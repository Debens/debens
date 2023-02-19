import { StorableEvent } from '@debens/event-sourcing';

type DeviceVerifiedData = {
    credentials: string;
};

export class DeviceVerified extends StorableEvent<DeviceVerifiedData> {
    constructor(public readonly id: string, public readonly data: DeviceVerifiedData) {
        super(id, 'identity');
    }
}
