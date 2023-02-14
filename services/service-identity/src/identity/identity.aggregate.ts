import { Aggregate } from '@debens/event-sourcing';
import { ConflictException, NotImplementedException } from '@nestjs/common';

import merge from 'deepmerge';
import { DateTime } from 'luxon';

import { HankoPublicService } from '../hanko/services/hanko-public.service';

import { ChallengeIdentity } from './commands/challenge-identity.command';
import { CreateIdentity } from './commands/create-identity.command';
import {
    FinalizeCredentials,
    PasskeyFinalizeCountersign,
} from './commands/finalize-credentials.command';
import { RegisterCredentials } from './commands/register-credentials.command';
import {
    PasscodeVerifyCountersign,
    PasskeyVerifyCountersign,
    VerifyIdentity,
} from './commands/verify-identity.command';
import { DeviceChallenged } from './events/device-challenged';
import { DeviceVerified } from './events/device-verified';
import { EmailChallenged } from './events/email-challenged';
import { EmailVerified } from './events/email-verified';
import { IdentityCreated } from './events/identity-created';
import {
    Challenge,
    ChallengeStatus,
    ChallengeType,
    IdentityState,
    PasscodeChallenge,
} from './identity.model';

const DEFAULT_STATE: Partial<IdentityState> = {
    id: undefined,
    createdOn: undefined,
    email: undefined,
    challenges: [],
};

export class IdentityAggregate extends Aggregate {
    state: IdentityState = merge({}, DEFAULT_STATE) as IdentityState;

    constructor(private readonly hanko: HankoPublicService, state?: IdentityState) {
        super();

        Object.assign(this.state, state);
    }

    async create(command: CreateIdentity) {
        if (!this.isNew) {
            throw new ConflictException('identity already exists');
        }

        const response = await this.hanko.user.create(command.email);

        this.apply(
            new IdentityCreated(response.user_id, {
                email: {
                    address: command.email,
                    id: response.email_id,
                },
            }),
        );

        return await this.challenge({
            identity: this.state.id,
            type: ChallengeType.Passcode,
            sign: { email: this.state.email[0] },
        });
    }

    async challenge(command: ChallengeIdentity) {
        switch (command.type) {
            case ChallengeType.Passcode: {
                const response = await this.hanko.passcode.initialize(
                    command.identity,
                    command.sign?.email?.id,
                );

                this.apply(
                    new EmailChallenged(this.state.id, {
                        id: response.id,
                        challengedOn: response.created_at,
                        lifetime: { seconds: response.ttl },
                    }),
                );

                return this.state.challenges.at(-1);
            }
            case ChallengeType.Passkey: {
                const response = await this.hanko.webauthn.assertion.initalize(this.state.id);

                this.apply(new DeviceChallenged(this.state.id, response));

                return this.state.challenges.at(-1);
            }
        }
    }

    async verify(command: VerifyIdentity) {
        switch (command.type) {
            case ChallengeType.Passcode: {
                const challenge = await this.hanko.passcode.finalize(
                    command.countersign as PasscodeVerifyCountersign,
                );

                return this.apply(new EmailVerified(this.state.id, { challenge: challenge.id }));
            }
            case ChallengeType.Passkey: {
                await this.hanko.webauthn.assertion.finalize(command.countersign as PasskeyVerifyCountersign);

                return this.apply(new DeviceVerified(this.state.id));
            }
        }
    }

    async register(command: RegisterCredentials) {
        switch (command.type) {
            case ChallengeType.Passcode: {
                throw new NotImplementedException();
            }
            case ChallengeType.Passkey: {
                return await this.hanko.webauthn.attestation.initalize();
            }
        }
    }

    async finalize(command: FinalizeCredentials) {
        switch (command.type) {
            case ChallengeType.Passcode: {
                throw new NotImplementedException();
            }
            case ChallengeType.Passkey: {
                return await this.hanko.webauthn.attestation.finalize(
                    command.countersign as PasskeyFinalizeCountersign,
                );
            }
        }
    }

    onIdentityCreated(event: IdentityCreated) {
        this.state.id = event.id;
        this.state.email = [event.data.email];
        this.state.createdOn = event.metadata.timestamp;
    }

    onEmailChallenged(event: EmailChallenged) {
        const isExpired =
            DateTime.fromISO(event.data.challengedOn).plus(event.data.lifetime) < DateTime.local();

        if (!isExpired)
            this.state.challenges.push({
                type: ChallengeType.Passcode,
                status: ChallengeStatus.Presented,
                id: event.data.id,
                challengedOn: event.data.challengedOn,
                lifetime: event.data.lifetime,
            });
    }

    onEmailVerified(event: EmailVerified) {
        const challenge = this.state.challenges
            .filter(this.isPasscodeChallenge)
            .find(challenge => challenge.id === event.data.challenge);

        if (challenge) {
            challenge.status = ChallengeStatus.Passed;
        }
    }

    onDeviceChallenged(event: DeviceChallenged) {
        this.state.challenges.push({
            type: ChallengeType.Passkey,
            status: ChallengeStatus.Presented,
            lifetime: { seconds: event.data.publicKey.timeout },
        });
    }

    private isPasscodeChallenge = (challenge: Challenge): challenge is PasscodeChallenge =>
        challenge.type === ChallengeType.Passcode;
}
