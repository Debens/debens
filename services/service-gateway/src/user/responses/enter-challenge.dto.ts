import { ChallengeType, DeviceChallengeDTO, EmailChallengeDTO } from '@debens/service-identity';

export interface WithPasscodeChallenge extends EmailChallengeDTO {
    user: string;
    type: ChallengeType.Passcode;
}

export interface WithPasskeyChallenge extends DeviceChallengeDTO {
    user: string;
    type: ChallengeType.Passkey;
}

export type EnterChallengeDTO = WithPasscodeChallenge | WithPasskeyChallenge;
