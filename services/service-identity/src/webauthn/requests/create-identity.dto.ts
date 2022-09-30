import { ApiProperty } from '@nestjs/swagger';

import { IsEmail } from 'class-validator';

export class CreateIdentityDTO {
    @IsEmail()
    @ApiProperty()
    email!: string;
}
