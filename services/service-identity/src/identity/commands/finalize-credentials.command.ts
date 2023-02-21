import { ICommand } from '@nestjs/cqrs';

import { ChallengeType } from '../identity.model';

export interface PasscodeFinalizeCountersign {
    code: string;
}

export interface PasskeyFinalizeCountersign {
    id: string;
    rawId: string;
    type: string;
    response: {
        clientDataJson: string;
        attestationObject: string;
        transports?: string;
    };
}

export type CredentialCountersign = PasscodeFinalizeCountersign | PasskeyFinalizeCountersign;

class Properties {
    readonly identity!: string;
    readonly type!: ChallengeType;
    readonly countersign!: CredentialCountersign;
}

export class FinalizeCredentials extends Properties implements ICommand {
    constructor(properties: Properties) {
        super();

        Object.assign(this, properties);
    }
}
