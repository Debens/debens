import { ICommand } from '@nestjs/cqrs';

class Properties {
    readonly email!: string;
}

export class Attest extends Properties implements ICommand {
    constructor(properties: Properties) {
        super();

        Object.assign(this, properties);
    }
}
