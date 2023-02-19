import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class VerifyPasscodeDTO {
    @IsUUID()
    @ApiProperty()
    user!: string;

    @IsUUID()
    @ApiProperty()
    challenge!: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    code!: string;
}
