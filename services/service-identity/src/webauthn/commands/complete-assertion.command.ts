import { ICommand } from '@nestjs/cqrs';

class Properties {
    readonly id!: string;
    readonly rawId!: string;
    readonly type!: string;
    readonly response!: {
        clientDataJSON: string;
        authenticatorData: string;
        signature: string;
        userHandle?: string;
    };
}

export class CompleteAssertion extends Properties implements ICommand {
    constructor(properties: Properties) {
        super();

        Object.assign(this, properties);
    }
}
