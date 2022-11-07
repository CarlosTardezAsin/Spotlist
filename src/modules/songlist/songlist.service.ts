import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SongListPostDTO } from "src/DTO/songlist.DTO";
import { Song, SongList, User } from "src/entities";
import { Repository } from "typeorm";

@Injectable()
export class SongListService {
    constructor(
        @InjectRepository(Song) private songRepository: Repository<Song>,
        @InjectRepository(SongList) private songlistRepository: Repository<SongList>,
    ) {}

    /**
	 *
	 * @param userId
	 * @returns All lists of a user
	 */
	async getLists(userId: number): Promise<SongList[]>;
    /**
	 *
	 * @param userId
	 * @param listId
	 * @returns A single list of a user with given listId
	 */
	async getLists(userId: number, listId: number): Promise<SongList>;
    async getLists(userId: number, listId?: number): Promise<SongList[] | SongList> {
        if(!listId) {
            return this.songlistRepository.find({ where: { user: { id: userId }}, relations: { songs: true }})
        }

        return this.songlistRepository.findOne({ where: { id: listId }, relations: { songs: true }})
    }
    
    /**
	 * CREATE or UPDATE a {@link SongList}.
	 * Use the listId if SongList has been created and just have to been added to a user
	 * @param songlist
	 * @return a new SongList
	 */
    async postSongList(user: User, songlist: SongListPostDTO): Promise<SongList> {
        return this.songlistRepository.save({...songlist, user});
    }
}