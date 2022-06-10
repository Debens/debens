import { NativeModules } from 'react-native';

import { ChallengeResponse, CreateIdentityResponse } from '@training/service-identity/src';

export interface AssertionRequest {
    id: string;
    rawId: string;
    type: string;
    response: {
        authenticatorData: string;
        clientDataJSON: string;
        signature: string;
        userHandle: string;
    };
}

export interface AttestationRequest {
    id: string;
    rawId: string;
    type: string;
    response: {
        attestationObject: string;
        clientDataJSON: string;
    };
}

interface Config {
    name: string;
    domain: string;
}

declare module 'react-native' {
    export interface NativeModulesStatic {
        Fido: {
            configure: (config: Config) => void;
            attestation: (request: CreateIdentityResponse) => Promise<AttestationRequest>;
            assertion: (request: ChallengeResponse) => Promise<AssertionRequest>;
        };
    }
}

export const Fido = NativeModules.Fido;
