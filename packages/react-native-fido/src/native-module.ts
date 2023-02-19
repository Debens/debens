import { NativeModules } from 'react-native';

import { Assertion, Attestation } from '@debens/service-identity/src';

export interface AssertionRequest {
    id: string;
    rawId: string;
    type: string;
    response: {
        authenticatorData: string;
        clientDataJson: string;
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
        clientDataJson: string;
    };
}

export interface Config {
    name: string;
    domain: string;
}

declare module 'react-native' {
    export interface NativeModulesStatic {
        Fido: {
            configure: (config: Config) => void;
            attestation: (request: Attestation) => Promise<AttestationRequest>;
            assertion: (request: Assertion) => Promise<AssertionRequest>;
        };
    }
}

export const Fido = NativeModules.Fido;
