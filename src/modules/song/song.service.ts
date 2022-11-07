import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SongDTO } from "src/DTO/song.DTO";
import { Song } from "src/entities";
import { Repository } from "typeorm";

@Injectable()
export class SongService {
    constructor(@InjectRepository(Song) private songRepository: Repository<Song>) {}

    /**
	 * @param artist
     * @param title
	 * @returns A song entity or undefined if song doesn't exist on db
	 */
    async findOne(artist: string, title: string): Promise<Song | undefined> {
        return this.songRepository.findOne({ where: {artist, title}})
    }


    /**
	 * CREATE {@link Song} or get the{@link Song} from db.
	 * @param songlist
	 * @return a new Song or a Song from db
	 */
    async createSong(song: SongDTO): Promise<Song> {
        const songDb = await this.findOne(song.artist, song.title);
        if(!songDb) {
            return this.songRepository.save(song);
        }
        return songDb;
    }
}