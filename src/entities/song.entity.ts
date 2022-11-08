import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { SongList } from './songlist.entity';

@Entity()
export class Song extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({nullable: false })
	artist: string;

	@Column({nullable: false })
	title: string;

	@ManyToMany(() => SongList, songlist => songlist.songs)
	lists?: SongList;
}