import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { SongList } from './songlist.entity';

@Entity()
export class Song extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 100, nullable: false })
	artist: string;

	@Column({ type: 'varchar', length: 100, nullable: false })
	title: string;

	@ManyToMany(() => SongList, songlist => songlist.songs)
	lists?: SongList;
}