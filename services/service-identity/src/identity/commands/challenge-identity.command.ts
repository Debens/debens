import { ICommand } from '@nestjs/cqrs';

import { ChallengeType } from '../identity.model';

export interface PasscodeSign {
    email?: { id: string };
}

/* only requires the identity id */
export type PasskeySign = undefined;

export type IdentitySign = PasscodeSign | PasskeySign;

class Properties {
    readonly identity!: string;
    readonly type!: ChallengeType;
    readonly sign!: IdentitySign;
}

export class ChallengeIdentity extends Properties implements ICommand {
    constructor(properties: Properties) {
        super();

        Object.assign(this, properties);
    }
}
