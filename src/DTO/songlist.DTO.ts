import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsArray } from 'class-validator';
import { SongDTO } from './song.DTO';

abstract class SongListDTO {
	@ApiProperty()
	@Expose()
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiPropertyOptional({isArray: true, type: SongDTO})
	@Expose()
	@Type(() => SongDTO)
	songs?: SongDTO[];
}

@Exclude()
export class SongListGetDTO extends SongListDTO {
	@Expose()
	@IsString()
	@IsNotEmpty()
	listId: number;
}

export class SongListPostDTO extends SongListDTO {}