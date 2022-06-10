export interface CreateIdentityRequest {
    id?: string;
    name: string;
}

export interface CreateIdentityResponse {
    publicKey: {
        user: {
            id?: string;
            name: string;
            displayName: string;
        };
        challenge: string;
    };
}

// FIXME: create dto - PublicKeyCredentialCreate
export interface CompleteIdentityRequest {
    id: string;
    rawId: string;
    type: string;
    response: {
        clientDataJSON: string;
        attestationObject: string;
    };
}

export type ChallengeRequest = { id: string };

export interface ChallengeResponse {
    publicKey: {
        challenge: string;
    };
}

// FIXME: create dto - PublicKeyCredentialGet
export interface VerifyRequest {
    id: string;
    rawId: string;
    type: string;
    response: {
        clientDataJSON: string;
        authenticatorData: string;
        signature: string;
        userHandle: string;
    };
}

export interface AssertionResult {
    user: string;
    accessToken: string;
    refreshToken: string;
}
