import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SignUpDTO } from "src/DTO/auth/signup.DTO";
import { SongDTO } from "src/DTO/song.DTO";
import { SongListPostDTO } from "src/DTO/songlist.DTO";
import { Song, SongList, User } from "src/entities";
import { Repository } from "typeorm";
import { SongService } from "../song/song.service";
import { SongListService } from "../songlist/songlist.service";

@Injectable()
export class UserService {
    constructor(
        private songlistSv: SongListService,
        private songSv: SongService,
        @InjectRepository(User) private userRepository: Repository<User>
    ) {}
    
    

    /**
	 * @param by user id
	 * @returns An user entity or undefined if user doesn't exist on db
	 */
    async findOne(by: {id: number}): Promise<User | undefined>
    /**
	 * @param by user name
	 * @returns An user entity or undefined if user doesn't exist on db
	 */
    async findOne(by: {name: string}): Promise<User | undefined>;
    async findOne(by: {id?: number, name?: string}): Promise<User | undefined> {
        if(typeof by.id !== 'undefined') {
            return this.userRepository.findOne({ where: {id: by.id}, relations: { songLists: true }})
        }
        return this.userRepository.findOne({ where: {name: by.name}})
    }

    /**
	 *
	 * @param userId
	 * @returns All lists of a user
	 * @throws Error if user not exist
	 */
    async getListsOfUser(userId: number): Promise<SongList[]> {
        const user = await this.findOne({id: userId});
        if (!user) {
			throw new Error(`User ${userId} does not exist`);
		}

        return this.songlistSv.getLists(userId);
    }

    /**
	 *
	 * @param userId
	 * @param listId
	 * @returns A single list of a user with given listId
	 * @throws Error if user not exist
	 */
    async getListOfUser(userId: number, listId: number): Promise<SongList> {
        const user = await this.findOne({id: userId});
        if (!user) {
			throw new Error(`User ${userId} does not exist`);
		}

        return this.songlistSv.getLists(userId, listId);
    }

    /**
	 * CREATE a {@link SongList} and then adds this song list to a user.
	 * Use the listId if SongList has been created and just have to been added to a user
	 * @param userId
	 * @param songList
	 */
    async addListToUser(userId: number, songList: SongListPostDTO): Promise<SongList> {
        const user = await this.findOne({id: userId});
        if (!user) {
			throw new Error(`User ${userId} does not exist`);
		}

        return this.songlistSv.postSongList(user, songList);
    }

    /**
	 * CREATE a {@link Song} and then adds this song to a list.
	 * Use the listId to add a created song to respective list
	 * @param userId
	 * @param listId
     * @param song
     * 
	 */
    async addSongToList(userId: number, listId: number, song: SongDTO): Promise<Song> {
        const user = await this.findOne({id: userId});
        if (!user) {
			throw new Error(`User ${userId} does not exist`);
		}

        const list = await this.songlistSv.getLists(userId, listId);
        const songDb = await this.songSv.createSong(song);
        list.songs.push(songDb);

        await this.songlistSv.postSongList(user, list)
        return songDb;
    }

    async createUser(user: SignUpDTO): Promise<User> {
        return this.userRepository.save(user);
    }
}