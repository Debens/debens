import { ApiProperty } from '@nestjs/swagger';

import { IsEmail } from 'class-validator';

export class IdentifierDTO {
    @IsEmail()
    @ApiProperty()
    email!: string;
}
