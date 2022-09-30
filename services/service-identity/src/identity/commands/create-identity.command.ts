import { ICommand } from '@nestjs/cqrs';

import * as uuid from 'uuid';

class Properties {
    readonly id: string = uuid.v4();

    readonly email!: string;
}

export class CreateIdentity extends Properties implements ICommand {
    constructor(properties: Properties) {
        super();

        Object.assign(this, properties);
    }
}
