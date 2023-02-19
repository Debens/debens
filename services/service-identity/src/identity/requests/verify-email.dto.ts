import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class VerifyEmailDTO {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ nullable: true })
    id?: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    code!: string;
}
