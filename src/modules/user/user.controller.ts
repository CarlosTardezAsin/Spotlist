import { Body, Controller, Get, Param, Post, UseGuards, NotFoundException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { SongListGetDTO, SongListPostDTO, SongDTO } from "../../DTO";
import { SongService } from "../song/song.service";
import { SongListService } from "../songlist/songlist.service";
import { UserService } from "./user.service";

@ApiTags('User')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UserController {
    constructor(private userSv: UserService, private songlistSv: SongListService, private songSv: SongService) {}

    @Get(':userId/lists')
    async getListsOfUser(@Param('userId') userId: number): Promise<SongListGetDTO[]> {
        const user = await this.userSv.findOne({id: userId});
        if (!user) {
			throw new NotFoundException(`User ${userId} does not exist`);
		}

        const lists = await this.songlistSv.getLists(userId);
        return lists.map(list => plainToInstance(SongListGetDTO, list))
    }

    @Get(':userId/lists/:listId')
    async getListOfUser(@Param('userId') userId: number, @Param('listId') listId: number): Promise<SongListGetDTO> {
        const user = await this.userSv.findOne({id: userId});
        if (!user) {
			throw new NotFoundException(`User ${userId} does not exist`);
		}

        const list = await this.songlistSv.getLists(userId, listId);
        if(!list) {
			throw new NotFoundException(`List ${listId} does not exist`);
        }

        return plainToInstance(SongListGetDTO, list);
    }

    @Post(':userId/lists')
    async addListToUser(@Param('userId') userId: number, @Body() songListDTO: SongListPostDTO): Promise<SongListGetDTO> {
        const user = await this.userSv.findOne({id: userId});
        if (!user) {
			throw new NotFoundException(`User ${userId} does not exist`);
		}

        const newList = await this.songlistSv.postSongList(user, songListDTO);
        return plainToInstance(SongListGetDTO, newList)
    }

    @Post(':userId/lists/:listId/songs')
    async addSongToList(@Param('userId') userId: number, @Param('listId') listId: number, @Body() songDTO: SongDTO): Promise<SongDTO> {
        const user = await this.userSv.findOne({id: userId});
        if (!user) {
			throw new NotFoundException(`User ${userId} does not exist`);
		}

        const song = await this.songSv.checkSong(songDTO);

        const list = await this.songlistSv.getLists(userId, listId);
        if(!list) {
			throw new NotFoundException(`List ${listId} does not exist`);
        }
        list.songs.push(song);

        await this.songlistSv.postSongList(user, list)
        return plainToInstance(SongDTO, song);
    }
}