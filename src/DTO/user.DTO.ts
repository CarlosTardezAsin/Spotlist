import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserDTO {
	@Expose()
	@IsString()
	@IsNotEmpty()
	id: string;

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