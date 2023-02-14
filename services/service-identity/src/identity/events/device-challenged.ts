import { StorableEvent } from '@debens/event-sourcing';

type DeviceChallengedData = {
    publicKey: {
        challenge: string;
        timeout: number;
        rpId: string;
        allowCredentials: { type: string; id: string }[];
        userVerification: string;
    };
};

export class DeviceChallenged extends StorableEvent<DeviceChallengedData> {
    constructor(public readonly id: string, public readonly data: DeviceChallengedData) {
        super(id, 'identity');
    }
}
