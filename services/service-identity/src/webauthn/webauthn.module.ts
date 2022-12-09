import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthModule } from '../auth/auth.module';
import { HankoModule } from '../hanko/hanko.module';
import { IdentityModule } from '../identity/identity.module';

import { AssertionController } from './assertion.controller';
import { AttestationController } from './attestation.controller';
import { AssertHandler } from './handlers/assert.handler';
import { AttestHandler } from './handlers/attest.handler';
import { CompleteAssertionHandler } from './handlers/complete-assertion.handler';
import { CompleteAttestationHandler } from './handlers/complete-attestation.handler';

export const CommandHandlers = [
    AttestHandler,
    CompleteAttestationHandler,
    AssertHandler,
    CompleteAssertionHandler,
];

export const EventHandlers = [];

@Module({
    controllers: [AttestationController, AssertionController],
    providers: [...CommandHandlers, ...EventHandlers, WebAuthnModule],
    imports: [CqrsModule, AuthModule, IdentityModule, HankoModule],
    exports: [HankoModule],
})
export class WebAuthnModule {}
