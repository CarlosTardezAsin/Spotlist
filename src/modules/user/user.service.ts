import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SignUpDTO } from "../../DTO/auth";
import { User } from "../../entities";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}
    
    
    /**
	 * @param by user id
	 * @returns An user entity or undefined if user doesn't exist on db
	 */
    async findOne(by: {id: number}): Promise<User | undefined>
    /**
	 * @param by user name
	 * @returns An user entity or undefined if user doesn't exist on db
	 */
    async findOne(by: {name: string}): Promise<User | undefined>;
    async findOne(by: {id?: number, name?: string}): Promise<User | undefined> {
        if(typeof by.id !== 'undefined') {
            return this.userRepository.findOne({ where: {id: by.id}, relations: { songLists: true }})
        }
        return this.userRepository.findOne({ where: {name: by.name}})
    }

    /**
	 * CREATE a {@link User}
	 * @param user
	 */
    async createUser(user: SignUpDTO): Promise<User> {
        return this.userRepository.save(user);
    }
}