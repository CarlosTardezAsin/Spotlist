import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../../entities";
import { SongModule } from "../song/song.module";
import { SongListModule } from "../songlist/songlist.module";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    imports: [TypeOrmModule.forFeature([User]), SongModule, SongListModule],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})

export class UserModule {}