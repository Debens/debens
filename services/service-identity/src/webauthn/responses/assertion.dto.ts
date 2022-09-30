import { ApiProperty } from '@nestjs/swagger';
import {
    CredentialRequestOptions,
    UserVerificationRequirement,
} from '@teamhanko/hanko-node';

export class Assertion implements CredentialRequestOptions {
    @ApiProperty()
    publicKey!: {
        challenge: string;
        timeout: number;
        rpID: string;
        allowCredentials: { type: string; id: string; transports: string[] }[];
        authenticatorSelection: { userVerification: UserVerificationRequirement };
    };
}
