import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { SongList } from './songlist.entity';

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({unique: true, nullable: false })
	name: string;

	@Column({nullable: false })
	password: string;

	@OneToMany(() => SongList, list => list.user)
	songLists: SongList[];
}