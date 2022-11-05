import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';


@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    ConfigModule.forRoot()
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
