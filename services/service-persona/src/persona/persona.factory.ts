import { IdentityService } from '@debens/service-identity';
import { Inject, Injectable } from '@nestjs/common';

import { PersonaAggregate, PersonaState } from './persona.aggregate';

@Injectable()
export class PersonaFactory {
    @Inject(IdentityService)
    private readonly identity!: IdentityService;

    create(state?: PersonaState) {
        return new PersonaAggregate(this.identity, state);
    }
}
