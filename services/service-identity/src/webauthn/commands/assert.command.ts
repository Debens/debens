import { ICommand } from '@nestjs/cqrs';

import * as uuid from 'uuid';

class Properties {
    readonly email!: string;
}

export class Assert extends Properties implements ICommand {
    readonly id: string = uuid.v4();

    constructor(properties: Properties) {
        super();

        Object.assign(this, properties);
    }
}
