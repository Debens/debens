import { ApiProperty } from '@nestjs/swagger';

import { IsISO8601, IsNumber, IsObject, IsPositive } from 'class-validator';

class ChallengeLifetime {
    @IsNumber()
    @IsPositive()
    @ApiProperty()
    seconds!: number;
}

export class DeviceChallengeDTO {
    @IsISO8601()
    @ApiProperty()
    challengedOn!: string;

    @IsObject()
    @ApiProperty()
    lifetime!: ChallengeLifetime;
}
