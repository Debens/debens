import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsObject, IsString } from 'class-validator';

class AttestationResponse {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    clientDataJson!: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    attestationObject!: string;

    // @IsString()
    // @IsNotEmpty()
    @ApiProperty()
    transports!: string;
}

export class FinalizeDeviceDTO {
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
