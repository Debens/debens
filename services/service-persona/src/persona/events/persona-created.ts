import { StorableEvent } from '@debens/event-sourcing';

type PersonaCreatedData = {
    name: string;
    identity: string;
};

export class PersonaCreated extends StorableEvent<PersonaCreatedData> {
    constructor(public readonly id: string, public readonly data: PersonaCreatedData) {
        super(id, 'persona');
    }
}
