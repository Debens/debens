import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import hankoConfig from '../config/hanko.config';

import { AssertionService } from './services/assertion.service';
import { AttestationService } from './services/attestation.service';
import { HankoClient } from './services/hanko-client';

@Module({
    imports: [ConfigModule.forFeature(hankoConfig)],
    providers: [AttestationService, AssertionService, HankoClient],
    exports: [AttestationService, AssertionService],
})
export class HankoModule {}
