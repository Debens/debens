import { ICommand } from '@nestjs/cqrs';

import { ChallengeType } from '../identity.model';

interface PasscodeSign {
    email: string;
}

type PasskeySign = undefined;

export type CredentialSign = PasscodeSign | PasskeySign;

class Properties {
    readonly identity!: string;
    readonly type!: ChallengeType;
    readonly sign!: CredentialSign;
}

export class RegisterCredentials extends Properties implements ICommand {
    constructor(properties: Properties) {
        super();

        Object.assign(this, properties);
    }
}
