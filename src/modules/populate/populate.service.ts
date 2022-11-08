import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDTO } from "src/DTO";
import { Repository } from "typeorm";
import { SongList, User } from "../../entities";
import { SongListService } from "../songlist/songlist.service";
import { UserService } from "../user/user.service";

@Injectable()
export class  PopulateService {
    constructor(
        private userSv: UserService,
        private songlistSv: SongListService,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(SongList) private songlistRepository: Repository<SongList>,
    ) {}

    async onApplicationBootstrap() {
        const user: UserDTO = { id: 1, name: 'test', password: 'test'}
        const songList = {id:1, name: 'gym', songs: [{ artist: 'Totling', title: 'Outside'}, { artist: 'Loyal', title: 'Shower'}], user}

        if(!(await this.userSv.findOne({name: user.name}))) {
            await this.userRepository.save(user);
        }

        if(!(await this.songlistSv.getLists(user.id, songList.id))) {
            await this.songlistRepository.save(songList)
        }
    }
}