import { NativeModules } from 'react-native';

export interface AssertionRequest {
    // unknown
}

export interface AssertionResponse {
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
    publicKey: {
        challenge: string;
        timeout: number;
        rpId: string;
        allowCredentials: { type: string; id: string }[];
        userVerification: string;
    };
}

export interface AttestationResponse {
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
            attestation: (request: AttestationRequest) => Promise<AttestationResponse>;
            assertion: (request: AssertionRequest) => Promise<AssertionResponse>;
        };
    }
}

export const Fido = NativeModules.Fido;
