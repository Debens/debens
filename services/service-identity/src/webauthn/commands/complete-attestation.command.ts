import { ICommand } from '@nestjs/cqrs';

class Properties {
    readonly id!: string;
    readonly rawId!: string;
    readonly type!: string;
    readonly response!: {
        clientDataJSON: string;
        attestationObject: string;
    };
}

export class CompleteAttestation extends Properties implements ICommand {
    constructor(properties: Properties) {
        super();

        Object.assign(this, properties);
    }
}
