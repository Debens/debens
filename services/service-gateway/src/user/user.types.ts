import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
    constructor(initial: User) {
        Object.assign(this, initial);
    }

    @Field(_type => ID)
    id!: string;

    @Field(_type => [Email])
    email!: Email[];
}

@ObjectType()
export class WebAuthnCredential {
    @Field(_type => ID)
    id!: string;

    @Field({ nullable: true })
    name?: string;
}

@ObjectType()
export class Email {
    constructor(initial: Email) {
        Object.assign(this, initial);
    }

    @Field(_type => ID)
    id!: string;

    @Field(_type => String)
    address!: string;
}

@ObjectType()
export class Names {
    constructor(initial: Names) {
        Object.assign(this, initial);
    }

    @Field(_type => String)
    display!: string;
}

@ObjectType()
export class Credentials {
    @Field(_type => Passkeys)
    passkeys = new Passkeys();
}

@ObjectType()
export class Passkeys {}

@ObjectType()
export class AuthenticatorSelectionCriteria {
    @Field({ nullable: true })
    authenticatorAttachment?: string;

    @Field()
    requireResidentKey!: number;

    @Field()
    residentKey!: string;

    @Field()
    userVerification!: string;
}

@ObjectType()
export class PublicKeyCredentialParameters {
    @Field()
    type!: string;

    @Field()
    alg!: number;
}

@ObjectType()
export class PublicKeyCredentialRpEntity {
    @Field()
    name!: string;

    @Field()
    id!: string;
}

@ObjectType()
export class PublicKeyCredentialUserEntity {
    @Field()
    id!: string;

    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    displayName?: string;
}

@ObjectType()
export class PublicKeyCredentialCreationOptions {
    @Field(_type => PublicKeyCredentialRpEntity)
    rp!: PublicKeyCredentialRpEntity;

    @Field(_type => PublicKeyCredentialUserEntity)
    user!: PublicKeyCredentialUserEntity;

    @Field()
    challenge!: string;

    @Field(_type => [PublicKeyCredentialParameters])
    pubKeyCredParams!: PublicKeyCredentialParameters[];

    @Field()
    timeout!: number;

    @Field(_type => AuthenticatorSelectionCriteria)
    authenticatorSelection!: AuthenticatorSelectionCriteria;

    @Field()
    attestation!: string;
}

@ObjectType()
export class PasskeyChallenge {
    @Field(_type => PublicKeyCredentialCreationOptions)
    publicKey!: PublicKeyCredentialCreationOptions;
}

@InputType()
class AuthenticatorAttestationResponse {
    @Field()
    clientDataJson!: string;

    @Field()
    attestationObject!: string;

    @Field({ nullable: true })
    transports?: string;
}

@InputType()
export class PublicKeyCredential {
    @Field()
    id!: string;

    @Field()
    rawId!: string;

    @Field()
    type!: string;

    @Field()
    response!: AuthenticatorAttestationResponse;
}

@ObjectType()
export class AttestationResult {
    @Field()
    success!: boolean;
}
