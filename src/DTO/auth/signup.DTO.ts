import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SignUpDTO {
    @Expose()
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @Expose()
    @ApiProperty()
    @IsNotEmpty()
    password: string;
}
