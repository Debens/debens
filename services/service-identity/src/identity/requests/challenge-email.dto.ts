import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsNotEmpty } from 'class-validator';

export class ChallengeEmailDTO {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email!: string;
}