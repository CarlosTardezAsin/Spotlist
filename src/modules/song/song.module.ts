import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Song } from "src/entities";
import { SongService } from "./song.service";

@Module({
    imports: [TypeOrmModule.forFeature([Song])],
    providers: [SongService],
    exports: [SongService]
})
export class SongModule {}