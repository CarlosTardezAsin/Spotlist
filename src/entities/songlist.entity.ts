import { Exclude } from 'class-transformer';
import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, ManyToMany, ManyToOne, JoinTable } from 'typeorm';
import { Song } from './song.entity';
import { User } from './user.entity';

@Entity()
export class SongList extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 100, nullable: false })
	name: string;

	@Exclude()
	@ManyToOne(() => User, user => user.songLists, { nullable: false })
	user?: User;

	@ManyToMany(() => Song, song => song.lists, { nullable: false, cascade: ['insert'] },)
	@JoinTable()
	songs?: Song[];
}