import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { SongList } from './songlist.entity';

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', unique: true, length: 100, nullable: false })
	name: string;

	@Column({ type: 'varchar', length: 100, nullable: false })
	password: string;

	@OneToMany(() => SongList, list => list.user)
	songLists: SongList[];
}