import { ApiProperty } from '@nestjs/swagger';

export class DeviceRegisterDTO {
    @ApiProperty()
    publicKey!: PublicKeyCredentialCreationOptions;
}

export class PublicKeyCredentialCreationOptions {
    @ApiProperty()
    rp!: PublicKeyCredentialRpEntity;

    @ApiProperty()
    user!: PublicKeyCredentialUserEntity;

    @ApiProperty()
    challenge!: string;

    @ApiProperty()
    pubKeyCredParams!: PublicKeyCredentialParameters[];

    @ApiProperty()
    timeout!: number;

    @ApiProperty()
    authenticatorSelection!: AuthenticatorSelectionCriteria;

    @ApiProperty()
    attestation!: string;
}

export class PublicKeyCredentialRpEntity {
    @ApiProperty()
    name!: string;

    @ApiProperty()
    id!: string;
}

export class PublicKeyCredentialUserEntity {
    @ApiProperty()
    id!: string;

    @ApiProperty({ nullable: true })
    name?: string;

    @ApiProperty({ nullable: true })
    displayName?: string;
}

export class PublicKeyCredentialParameters {
    @ApiProperty()
    type!: string;

    @ApiProperty()
    alg!: number;
}

export class AuthenticatorSelectionCriteria {
    @ApiProperty()
    authenticatorAttachment!: string;

    @ApiProperty()
    requireResidentKey!: number;

    @ApiProperty()
    residentKey!: string;

    @ApiProperty()
    userVerification!: string;
}
