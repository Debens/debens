import http from '@debens/http';
import { User } from '@debens/nestjs-auth';
import { IdentityAPI } from '@debens/service-identity';
import { Injectable } from '@nestjs/common';

import { PersonaAggregate, PersonaState } from './persona.aggregate';

@Injectable()
export class PersonaFactory {
    constructor(private user: User) {}

    create(state?: PersonaState) {
        return new PersonaAggregate(
            new IdentityAPI(
                http.client.extend([
                    http.modules.domain(process.env.IDENTITY_URL!),
                    http.modules.bearer({ token: this.user.token }),
                ]),
            ),
            state,
        );
    }
}
