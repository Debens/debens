import { ICommand } from '@nestjs/cqrs';

import * as uuid from 'uuid';

class Properties {
    readonly identity!: string;
}

export class VerifyIdentity extends Properties implements ICommand {
    readonly id: string = uuid.v4();

    constructor(properties: Properties) {
        super();

        Object.assign(this, properties);
    }
}
