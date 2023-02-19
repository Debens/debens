import { ApiProperty } from '@nestjs/swagger';

import { IsISO8601, IsNumber, IsObject, IsPositive, IsUUID } from 'class-validator';

class ChallengeLifetime {
    @IsNumber()
    @IsPositive()
    @ApiProperty()
    seconds!: number;
}
export class EmailChallengeDTO {
    @IsUUID()
    @ApiProperty()
    id!: string;

    @IsISO8601()
    @ApiProperty()
    challengedOn!: string;

    @IsObject()
    @ApiProperty()
    lifetime!: ChallengeLifetime;
}
