import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
    imports: [
        ConfigModule,
        PassportModule.register({
			defaultStrategy: 'jwt',
		}),
        JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory(cnfSv: ConfigService) {
				return {
					secret: cnfSv.get('JWT_SECRET'),
					signOptions: {
						expiresIn: parseInt(cnfSv.get('JWT_EXPIRETIME')),
					},
				};
			},
		}),
	],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy]
})
export class AuthModule {}