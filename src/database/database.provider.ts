import dotenv from 'dotenv'
import { ConfigService } from '@nestjs/config';
import { Song, SongList, User } from 'src/entities';
import { DataSource, DataSourceOptions} from 'typeorm';
import 'dotenv/config'

const cnfSv = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
	type: 'mysql',
	host: cnfSv.get('TYPEORM_HOST'),
	username: cnfSv.get('TYPEORM_USERNAME'),
	port: Number(cnfSv.get('TYPEORM_PORT')),
	database: cnfSv.get('TYPEORM_DATABASE'),
	password: cnfSv.get('TYPEORM_PASSWORD'),
	entities: [
		Song,
		SongList,
		User
	],
	migrations: [__dirname + '/migrations/*{.ts,.js}'],
	logging: false,
} 

const dataSource = new DataSource(dataSourceOptions)
export default dataSource;

