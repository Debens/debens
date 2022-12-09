import { ApiProperty } from '@nestjs/swagger';
import {
    AttestationConveyancePreference,
    AuthenticatorAttachment,
    CredentialCreationOptions,
    UserVerificationRequirement,
} from '@teamhanko/hanko-node';

export class Attestation implements CredentialCreationOptions {
    @ApiProperty()
    publicKey!: {
        rp: { id: string; name: string };
        user: { id: string; name: string; displayName: string };
        challenge: string;
        pubKeyCredParams: unknown[];
        timeout: number;
        excludeCredentials: unknown[];
        authenticatorSelection: {
            AuthenticatorAttachment: AuthenticatorAttachment;
            userVerification: UserVerificationRequirement;
            requireResidentKey: boolean;
        };
        attestation: AttestationConveyancePreference;
    };
}
