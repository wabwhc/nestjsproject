import { Body, Controller, Post, Get, UseGuards, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from '../auth/security/auth.guard';
import { Request, Response } from 'express';
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
export class UsersController {
    constructor( private usersService: UsersService){}

    @Post("register")
    async createUser(@Body() userDto: UserDto){
        return await this.usersService.createUser(userDto)
    }

    // @Post("sign-in")
    // async validateUser(@Body() userDto: UserDto, @Res() res: Response){
    //     const jwt = await this.authService.validateUser(userDto)
    //     res.setHeader('Authorization', 'Bearer ' + jwt.accessToken)

    //     return res.json(jwt);
    // }
    
    // @Get('/authenticate')
    // @UseGuards(AuthGuard)
    // isAuthenticated(@Req() req: Request){
    //     console.log("test")
    //     const user: any = req.user;
        
    //     return user
    // }

}
