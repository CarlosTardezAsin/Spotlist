import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { SongDTO } from "src/DTO/song.DTO";
import { SongListGetDTO, SongListPostDTO } from "src/DTO/songlist.DTO";
import { UserService } from "./user.service";

@ApiTags('User')
@Controller('users')
export class UserController {
    constructor(private userSv: UserService) {}

    @Get(':userId/lists')
    async getListsOfUser(@Param('userId') userId: number): Promise<SongListGetDTO[]> {
        const lists = await this.userSv.getListsOfUser(userId);
        return lists.map(list => plainToInstance(SongListGetDTO, list))
    }

    @Get(':userId/lists/:listId')
    async getListOfUser(@Param('userId') userId: number, @Param('listId') listId: number): Promise<SongListGetDTO> {
        const list = await this.userSv.getListOfUser(userId, listId);
        return plainToInstance(SongListGetDTO, list);
    }

    @Post(':userId/lists')
    async addListToUser(@Param('userId') userId: number, @Body() songListDTO: SongListPostDTO): Promise<SongListGetDTO> {
        const newList = await this.userSv.addListToUser(userId, songListDTO);
        return plainToInstance(SongListGetDTO, newList)
    }

    @Post(':userId/lists/:listId/songs')
    async addSongToList(@Param('userId') userId: number, @Param('listId') listId: number, @Body() songDTO: SongDTO): Promise<SongDTO> {
        const newSong = await this.userSv.addSongToList(userId, listId, songDTO);
        return plainToInstance(SongDTO, newSong);
    }
}