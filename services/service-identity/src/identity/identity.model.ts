export type IdentityState = {
    id: string;
    email: { id: string; address: string }[];
    challenges: Challenge[];
    createdOn: Date;
};

export enum ChallengeType {
    Passcode = 'passcode',
    Passkey = 'passkey',
}

export enum ChallengeStatus {
    Presented = 'presented',
    Passed = 'passed',
    Failed = 'failed',
    Expired = 'expired',
}

export type Challenge = PasscodeChallenge | PasskeyChallenge;

export interface PasscodeChallenge {
    type: ChallengeType.Passcode;
    status: ChallengeStatus;
    id: string;
    challengedOn: string;
    lifetime: { seconds: number };
}

export interface PasskeyChallenge {
    type: ChallengeType.Passkey;
    status: ChallengeStatus;
    lifetime: { seconds: number };
}
