import { ApiProperty } from '@nestjs/swagger';

export class DeviceCredentalDTO {
    @ApiProperty()
    id!: string;

    @ApiProperty()
    name!: string;

    @ApiProperty()
    createdOn!: string;

    @ApiProperty()
    publicKey!: string;
}

export class DeviceCredentalsDTO {
    @ApiProperty()
    count!: number;

    @ApiProperty()
    results!: DeviceCredentalDTO[];
}
