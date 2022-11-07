import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';

@Exclude()
export class SongDTO {
	@ApiProperty()
	@Expose()
	@IsString()
	@IsNotEmpty()
	artist: string;

	@ApiProperty()
	@Expose()
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	title: string;
}