import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDTO {
    @Expose()
    @ApiProperty()
    name: string;

    @Expose()
    @ApiProperty()
    password: string;
}
