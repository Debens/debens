import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateIdentityDTO {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email!: string;
}
