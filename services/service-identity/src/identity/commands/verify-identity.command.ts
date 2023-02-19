import { ICommand } from '@nestjs/cqrs';

import { ChallengeType } from '../identity.model';

export interface PasscodeVerifyCountersign {
    id?: string /* passcode id */;
    code: string;
}

export interface PasskeyVerifyCountersign {
    id: string;
    rawId: string;
    type: string;
    response: {
        clientDataJson: string;
        authenticatorData: string;
        signature: string;
        userHandle: string;
    };
}

export type IdentityCounterSign = PasscodeVerifyCountersign | PasskeyVerifyCountersign;

class Properties {
    readonly identity!: string;
    readonly type!: ChallengeType;
    readonly countersign!: IdentityCounterSign;
}

export class VerifyIdentity extends Properties implements ICommand {
    constructor(properties: Properties) {
        super();

        Object.assign(this, properties);
    }
}
