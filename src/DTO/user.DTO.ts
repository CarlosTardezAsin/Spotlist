import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserDTO {
	@Expose()
	@IsNumber()
	@IsNotEmpty()
	id: number;

	@Expose()
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	name: string;

	@Expose()
	@IsString()
	@IsNotEmpty()
	password: string;
}