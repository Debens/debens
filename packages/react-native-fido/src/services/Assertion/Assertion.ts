import { NativeModules } from 'react-native';

import { AssertionAPI, ChallengeIdentityDTO, Tokens } from '@debens/service-identity';

import { AssertionRequest } from '../../native-module';

export class Assertion {
    constructor(private readonly api: AssertionAPI) {}

    async login(params: ChallengeIdentityDTO): Promise<Tokens> {
        const challenge = await this.challenge(params);
        return await this.verify(challenge);
    }

    private async challenge(params: ChallengeIdentityDTO): Promise<AssertionRequest> {
        const { data: request } = await this.api.create(params);

        return await NativeModules.Fido.assertion(request);
    }

    private async verify(request: AssertionRequest): Promise<Tokens> {
        const { data: assertion } = await this.api.complete(request);

        return assertion;
    }
}
