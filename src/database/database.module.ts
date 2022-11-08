import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Song, SongList, User } from "../entities";
import { dataSourceOptions } from "./database.provider";

@Module({
    imports: [
        TypeOrmModule.forRoot(dataSourceOptions)
    ]
})
export class DatabaseModule {}

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'sqlite',
			database: ':memory:',
			dropSchema: true,
			synchronize: true,
			entities: [User, Song, SongList],
			logging: false,
		}),
	],
})
export class TestingDatabaseModule {}