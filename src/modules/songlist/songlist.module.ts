import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Song, SongList } from "../../entities";
import { SongListService } from "./songlist.service";

@Module({
    imports: [TypeOrmModule.forFeature([Song, SongList])],
    providers: [SongListService],
    exports: [SongListService]
})
export class SongListModule {}