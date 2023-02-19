import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterEmailDTO {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email!: string;
}
