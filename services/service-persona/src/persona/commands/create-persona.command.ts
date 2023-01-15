import { ICommand } from '@nestjs/cqrs';

import * as uuid from 'uuid';

class Properties {
    readonly id: string = uuid.v4();

    readonly name!: string;
    readonly identity!: string;
}

export class CreatePersona extends Properties implements ICommand {
    constructor(properties: Properties) {
        super();

        Object.assign(this, properties);
    }
}
