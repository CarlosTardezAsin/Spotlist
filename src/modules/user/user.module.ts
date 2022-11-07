import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities";
import { SongModule } from "../song/song.module";
import { SongListModule } from "../songlist/songlist.module";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    imports: [TypeOrmModule.forFeature([User]), SongModule, SongListModule],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}