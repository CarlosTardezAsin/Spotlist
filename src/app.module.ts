import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { SongListModule } from './modules/songlist/songlist.module';
import { UserModule } from './modules/user/user.module';


@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    SongListModule,
    UserModule,
    ConfigModule.forRoot()
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
