import { StorableEvent } from '@debens/event-sourcing';

type DeviceRegisteredData = {
    credentials: string;
};

export class DeviceRegistered extends StorableEvent<DeviceRegisteredData> {
    constructor(public readonly id: string, public readonly data: DeviceRegisteredData) {
        super(id, 'identity');
    }
}
