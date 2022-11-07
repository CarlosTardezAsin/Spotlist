import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { SigninDTO } from "src/DTO/auth/sigin.DTO";
import { UserService } from "../user/user.service";
import { compare, hashSync } from 'bcrypt';
import { UserDTO } from "src/DTO/user.DTO";
import { SignUpDTO } from "src/DTO/auth/signup.DTO";
import { User } from "src/entities";

@Injectable()
export class AuthService {
    constructor(private jwtSv: JwtService, private userSv: UserService) {}

    async signin(siginDTO: SigninDTO): Promise<{ token: string }> {
        const { name, password } = siginDTO;
        const user = await this.userSv.findOne({name});
    
        if(!user) {
            throw new UnauthorizedException('Email or password incorrect');
        }
    
        const isPasswCorrect = await compare(password, user.password);
    
        if(!isPasswCorrect) {
            throw new UnauthorizedException('Email or password incorrect');
        }
    
        const payload: UserDTO = {
            id: user.id,
            name: user.name,
            password: user.password,
        };
    
        const token = this.jwtSv.sign(payload);
    
        return { token };
    }

    async signup(user: SignUpDTO): Promise<User> {
        user.password = hashSync(user.password, 0);
        return this.userSv.createUser(user);
    }    
}

