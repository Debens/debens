import { Inject, Injectable } from '@nestjs/common';

import { HankoPublicService } from '../hanko/services/hanko-public.service';

import { IdentityAggregate } from './identity.aggregate';
import { IdentityState } from './identity.model';

@Injectable()
export class IdentityFactory {
    @Inject(HankoPublicService)
    private readonly hanko!: HankoPublicService;

    create(state?: IdentityState) {
        return new IdentityAggregate(this.hanko, state);
    }
}
