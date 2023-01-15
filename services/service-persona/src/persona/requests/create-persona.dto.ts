import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreatePersonaDTO {
    @IsUUID()
    @ApiProperty()
    id!: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name!: string;

    @IsUUID()
    @ApiProperty()
    identity!: string;
}
