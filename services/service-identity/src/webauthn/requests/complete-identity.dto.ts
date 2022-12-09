import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsObject, IsString } from 'class-validator';

class AttestationResponse {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    clientDataJSON!: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    attestationObject!: string;
}

export class CompleteIdentityDTO {
    @ApiProperty()
    id!: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    rawId!: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    type!: string;

    @IsObject()
    @ApiProperty()
    response!: AttestationResponse;
}
