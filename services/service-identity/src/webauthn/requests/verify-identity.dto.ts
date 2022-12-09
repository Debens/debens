import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsObject, IsString } from 'class-validator';

class AssertionResponse {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    clientDataJSON!: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    authenticatorData!: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    signature!: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    userHandle!: string;
}

export class VerifyIdentityDTO {
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
    response!: AssertionResponse;
}
