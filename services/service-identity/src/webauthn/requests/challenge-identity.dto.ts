import { ApiProperty } from '@nestjs/swagger';

import { IsEmail } from 'class-validator';

export class ChallengeIdentityDTO {
    @IsEmail()
    @ApiProperty()
    email!: string;
}
