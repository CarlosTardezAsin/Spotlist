import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SongList, User } from "../../entities";
import { SongListModule } from "../songlist/songlist.module";
import { UserModule } from "../user/user.module";
import { PopulateService } from "./populate.service";

@Module({
    imports: [
        UserModule,
        SongListModule,
        TypeOrmModule.forFeature([User, SongList])
    ],
    providers: [
        PopulateService
    ]

})
export class PopulateModule {}