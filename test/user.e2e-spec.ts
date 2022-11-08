import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppTestingModule } from '../src/app.module';
import * as request from 'supertest';
import { TestingDatabaseModule } from '../src/database/database.module';
import { hashSync } from 'bcrypt';
import { getConnection, Repository } from 'typeorm';
import { Song, SongList, User } from '../src/entities';
import { SongListPostDTO } from '../src/DTO/songlist.DTO';
import { SongDTO } from '../src/DTO/song.DTO';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UsersController (e2e)', () => {
	let app: INestApplication;
	let userRepository: Repository<User>;
	let songListRepository: Repository<SongList>;

	const users = {
		user1: { id: 1, name: 'carlos', password: 'pass123' },
		userNotRegistered: { id: 290, name: 'Marcos', password: 'password' },
	};

	/**
	 * to debug use {@link https://jwt.io/}
	 */
	const tokens = {
		user1:
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImNhcmxvcyIsInBhc3N3b3JkIjoiJDJhJDEwJDlUOXpzUmVkTGNlcHozYzliM0xjQ3VLZTdnUUdONGpkRXFvNW5rdVp1YnFuNUdTQjdzUXo2IiwiaWF0IjoxNjY3ODcwNDg0fQ.h5zQX06UH5pKfOlTpHCuxCt7JtRacmIV5_PXGH5jFrY',
		userNotRegistered:
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
	};

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [AppTestingModule, TestingDatabaseModule],
		}).compile();

		userRepository = module.get<Repository<User>>(getRepositoryToken(User));
		songListRepository = module.get<Repository<SongList>>(getRepositoryToken(SongList));

		const user = await userRepository.save({
			id: users.user1.id,
			name: users.user1.name,
			password: hashSync(users.user1.password, 0),
		});

		const songs: SongDTO[] = [{ artist: 'Totling', title: 'Outside'}, { artist: 'Loyal', title: 'Shower'}]

		const songLists = await songListRepository.save({name: 'gym', songs, user})
		
		app = module.createNestApplication();
		await app.init();
	});

	afterAll(async () => {
		await app.close();
	});

	describe('getListsOfUser endpoint', () => {
		it('should return all songlists of an user', () => {
			return request(app.getHttpServer())
				.get(`/users/${users.user1.id}/lists`)
				.auth(tokens.user1, { type: 'bearer' })
				.then(response => {
					expect(response.status).toBe(200);
					expect(response.body).toEqual(expect.any(Array));
					expect(response.body).toStrictEqual(
							JSON.parse('[{"name":"gym","songs":[{"artist":"Totling", "title":"Outside"},{"artist":"Loyal", "title":"Shower"}]}]')
					);
				});
		});

		it('should return 401 if there is no token provided', () => {
			return request(app.getHttpServer())
				.get(`/users/${users.user1.id}/lists`)
				.then(response => {
					expect(response.status).toBe(401);
					expect(response.body.message).toBe('Unauthorized');
				});
		});

		it('should return 404 if the user does not exist and jwt is valid', () => {
			return request(app.getHttpServer())
				.get(`/users/${users.userNotRegistered.id}/lists`)
				.auth(tokens.user1, { type: 'bearer' })
				.then(response => {
					expect(response.status).toBe(404);
				});
		});
	});

	describe('getListOfUser endpoint', () => {
		it('should return a given list of an user', () => {
			return request(app.getHttpServer())
				.get(`/users/${users.user1.id}/lists/1`)
				.auth(tokens.user1, { type: 'bearer' })
				.then(response => {
					expect(response.status).toBe(200);
					expect(response.body).toStrictEqual(
						JSON.parse(
							'{"name":"gym","songs":[{"artist":"Totling", "title":"Outside"},{"artist":"Loyal", "title":"Shower"}]}',
						),
					);
				});
		});

		it('should return 404 if that list does not exist', () => {
			const listIdNotExist = 21309;
			return request(app.getHttpServer())
				.get(`/users/${users.user1.id}/lists/${listIdNotExist}`)
				.auth(tokens.user1, { type: 'bearer' })
				.then(response => {
					expect(response.status).toBe(404);
					expect(response.body.message).toBe(`List ${listIdNotExist} does not exist`);
				});
		});

		it('should return 404 if that user does not exist', () => {
			return request(app.getHttpServer())
				.get(`/users/${users.userNotRegistered.id}/lists/1`)
				.auth(tokens.user1, { type: 'bearer' })
				.then(response => {
					expect(response.status).toBe(404);
					expect(response.body.message).toBe(`User 290 does not exist`);
				});
		});

		it('should return 401 if there is no token provided', () => {
			return request(app.getHttpServer())
				.get(`/users/${users.user1.id}/lists/1`)
				.then(response => {
					expect(response.status).toBe(401);
					expect(response.body.message).toBe('Unauthorized');
				});
		});
	});

	describe('addListToUser endpoint', () => {
		it('should add a list to a given user', async () => {
			const payload: SongListPostDTO = { name: 'study', songs: [{artist: 'loffy', title: 'pop'}] };
			return request(app.getHttpServer())
				.post(`/users/${users.user1.id}/lists`)
				.send(payload)
				.auth(tokens.user1, { type: 'bearer' })
				.then(response => {
					expect(response.status).toBe(201);
					expect(response.body).toEqual(expect.any(Object));
					expect(response.body).toStrictEqual(
						JSON.parse(
							'{"name":"study","songs":[{"artist":"loffy", "title":"pop"}]}',
						),
					);
			});			
		});

		it('should return 404 if that user does not exist', async () => {
			const payload: SongListPostDTO = { name: 'study', songs: [{artist: 'loffy', title: 'pop'}] };
			return request(app.getHttpServer())
				.post(`/users/${users.userNotRegistered.id}/lists`)
				.send(payload)
				.auth(tokens.user1, { type: 'bearer' })
				.then(response => {
					expect(response.status).toBe(404);
					expect(response.body.message).toBe(`User 290 does not exist`);
			});			
		});

		it('should return 401 if there is no token provided', () => {
			const payload: SongListPostDTO = { name: 'study', songs: [{artist: 'loffy', title: 'pop'}] };
			return request(app.getHttpServer())
				.post(`/users/${users.user1.id}/lists`)
				.send(payload)
				.then(response => {
					expect(response.status).toBe(401);
					expect(response.body.message).toBe('Unauthorized');
				});
		});
	});

	describe('addSongToList endpoint', () => {
		it('should add a song to a given list', async () => {
			const payload: SongDTO = { artist: 'Dua Lipa', title: 'Cold Heart' };
			const req1 = await request(app.getHttpServer())
				.post(`/users/${users.user1.id}/lists/1/songs`)
				.send(payload)
				.auth(tokens.user1, { type: 'bearer' });

			expect(req1.status).toBe(201);
		});

		it('should return 404 if that list does not exist', () => {
			const payload: SongDTO = { artist: 'Dua Lipa', title: 'Cold Heart' };
			const listIdNotExist = 9999;
			return request(app.getHttpServer())
				.post(`/users/${users.user1.id}/lists/${listIdNotExist}/songs`)
				.auth(tokens.user1, { type: 'bearer' })
				.send(payload)
				.then(response => {
					expect(response.status).toBe(404);
					expect(response.body.message).toBe(`List ${listIdNotExist} does not exist`);
				});
		});

		it('should return 401 if there is no token provided', () => {
			const payload: SongDTO = { title: 'RandomTitle', artist: 'RandomArtist' };
			return request(app.getHttpServer())
				.post(`/users/${users.user1.id}/lists/1/songs`)
				.send(payload)
				.then(response => {
					expect(response.status).toBe(401);
					expect(response.body.message).toBe('Unauthorized');
				});
		});
	});
});