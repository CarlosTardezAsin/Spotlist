import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import * as express from 'express';
import { SigninDTO, SignUpDTO } from "../../DTO/auth";
import { AuthService } from "./auth.service";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authSv: AuthService) {}

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    async me(@Request() req: express.Request) {
        return req.user;
    }

    @Post('signin')
    async signin(@Body() signinDto: SigninDTO): Promise<{token: string}> {
        return this.authSv.signin(signinDto);
    }

    @Post('signup')
    async signup(@Body() signupDto: SignUpDTO) {
        return this.authSv.signup(signupDto);
    }
}