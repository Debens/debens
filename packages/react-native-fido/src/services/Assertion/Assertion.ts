import { NativeModules } from 'react-native';

import { AssertionResult, AssertionService, ChallengeRequest } from '@training/service-identity';

import { AssertionRequest } from '../../native-module';

export class Assertion {
    constructor(private readonly service: AssertionService) {}

    async login(params?: ChallengeRequest): Promise<AssertionResult> {
        const challenge = await this.challenge(params);
        return await this.verify(challenge);
    }

    private async challenge(params?: ChallengeRequest): Promise<AssertionRequest> {
        const { data: request } = await this.service.create(params);

        return await NativeModules.Fido.assertion(request);
    }

    private async verify(request: AssertionRequest): Promise<AssertionResult> {
        const { data: assertion } = await this.service.complete(request);

        return assertion;
    }
}
