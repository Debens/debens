import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ClsModule } from 'nestjs-cls';

import hankoConfig from '../config/hanko.config';

import { Hanko } from './context/hanko.proxy';
import { AssertionService } from './services/assertion.service';
import { AttestationService } from './services/attestation.service';
import { HankoAdminService } from './services/hank-admin.service';
import { HankoClient } from './services/hanko-client';
import { HankoPublicService } from './services/hanko-public.service';

@Module({
    imports: [ClsModule.forFeature(Hanko), ConfigModule.forFeature(hankoConfig)],
    providers: [AttestationService, AssertionService, HankoAdminService, HankoPublicService, HankoClient],
    exports: [AttestationService, AssertionService, HankoAdminService, HankoPublicService],
})
export class HankoModule {}
