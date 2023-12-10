import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/users.entity';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
// import { AuthService } from 'src/auth/auth.service';
// import { JwtService } from '@nestjs/jwt';
// import { Payload } from 'src/auth/security/payload.interface';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        // private authService: AuthService,
        // private jwtService: JwtService
    ){}

    async createUser(userDto: UserDto): Promise<UserDto>{
        // if(await this.authService.findUser(userDto.email)){
        //     throw new UnauthorizedException('이미 해당하는 아이디가 존재합니다.')
        // }
        const hashedPassword = await bcrypt.hash(userDto.password, 10)

        return await this.usersRepository.save({ email: userDto.email, password: hashedPassword });
    }


    // async validateUser(userDto: UserDto){
    //     //const userFind: UserDto = await this.findUser(userDto.email);
    //     //const validatePassword = await bcrypt.compare(userDto.password, userFind.password);
    //     //if(!userFind || !validatePassword){
    //     //    throw new UnauthorizedException();
    //     //}
    //     // return "login "

    //     // const searchedUser = await this.authService.findUser(userDto.email);
    //     // const validatePassword = await bcrypt.compare(userDto.password, searchedUser.password);

    //     // if(!searchedUser || !validatePassword){
    //     //     throw new UnauthorizedException();
    //     // }

    //     // //userDto를 이용하여 사용자 검색
    //     // const payload: Payload = { email: searchedUser.email }

    //     return {
    //         accessToken: (await this.authService.validateUser(userDto)).accessToken
    //     }
    // }


    // async findUser(email: string): Promise<UserDto> {

    //     return await this.usersRepository.findOne({where: { email }});
    // }

}
