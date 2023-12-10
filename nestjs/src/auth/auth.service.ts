import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './security/payload.interface';
import { Repository } from 'typeorm';
import { User } from 'src/users/entity/users.entity';
import { UserDto } from 'src/users/dto/user.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardsService } from 'src/boards/boards.service';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(User) private usersRepository: Repository<User>,
        private boardsService: BoardsService
    ){}

    async getAll(){
        return this.boardsService.getAllBoards()
    }

    async validateUser(userDto: UserDto) {
        const searchedUser = await this.findUser(userDto.email);
        const validatePassword = await bcrypt.compare(userDto.password, searchedUser.password);
  
        if(!searchedUser || !validatePassword){
            throw new UnauthorizedException();
        }

        const payload: Payload = { email: searchedUser.email }

        return {
            accessToken: this.jwtService.sign(payload)
        }
    }

    tokenValidateUser(payload: Payload){
        return {
            user: payload.email
        }
    }

    async findUser(email: string){
        //return {email: "test", password: "test"}
        return await this.usersRepository.findOne({where: { email }});
    }
}
