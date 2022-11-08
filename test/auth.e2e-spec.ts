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
		user1: { id:1, name: 'carlos', password: 'pass123' },
		userNotRegistered: {name: 'Marcos', password: 'password' },
	};

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [AppTestingModule, TestingDatabaseModule],
		}).compile();

		userRepository = module.get<Repository<User>>(getRepositoryToken(User));

		const user = await userRepository.save({
			id: users.user1.id,
			name: users.user1.name,
			password: hashSync(users.user1.password, 0),
		});
		
		app = module.createNestApplication();
		await app.init();
	});

	afterAll(async () => {
		await app.close();
	});

	describe('sigin endpoint', () => {
		it('should return token of an user', () => {
            const payload = {name: 'carlos', password: 'pass123'}
			return request(app.getHttpServer())
				.post(`/auth/signin`)
                .send(payload)
				.then(response => {
					expect(response.status).toBe(201);
				});
		});

        it('return 401 if name is wrong', () => {
            const payload = {name: 'cars', password: 'pass123'}
            return request(app.getHttpServer())
            .post(`/auth/signin`)
            .send(payload)
            .then(response => {
                expect(response.status).toBe(401);
				expect(response.body.message).toBe('Email or password incorrect');
            });
        });

        it('return 401 if password is wrong', () => {
            const payload = {name: 'carlos', password: 'random'}
            return request(app.getHttpServer())
            .post(`/auth/signin`)
            .send(payload)
            .then(response => {
                expect(response.status).toBe(401);
				expect(response.body.message).toBe('Email or password incorrect');
            });
        });
	});

    describe('sigup endpoint', () => {
		it('should return token of a new user registered', () => {
			return request(app.getHttpServer())
				.post(`/auth/signup`)
                .send(users.userNotRegistered)
				.then(response => {
					expect(response.status).toBe(201);
				});
		});

        it('return 404 if name is alreay taken', () => {
            const payload = {name: 'carlos', password: 'random'}
            return request(app.getHttpServer())
            .post(`/auth/signup`)
            .send(payload)
            .then(response => {
                expect(response.status).toBe(400);
				expect(response.body.message).toBe('User with that name already created');
            });
        });        
	});
});