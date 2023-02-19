import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsOptional } from 'class-validator';

export class ChallengeEmailDTO {
    @IsEmail()
    @IsOptional()
    @ApiProperty({ nullable: true })
    email?: string;
}
