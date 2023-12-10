import { Body, Controller, Post, Req, Res, UseGuards, Get, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { AuthGuard } from './security/auth.guard';
import { UserDto } from 'src/users/dto/user.dto';
import { BoardsService } from 'src/boards/boards.service';
import { CreateBoardDto } from 'src/boards/dto/create-board.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private boardsService: BoardsService){}

    @Post('/sign-in')
    async singin(@Body() userDTO: UserDto, @Res() res: Response){
        const jwt = await this.authService.validateUser(userDTO);
        res.setHeader('Authorization', 'Bearer ' + jwt.accessToken)
        
        return res.json(jwt);
    }

    @Get('/authenticate')
    @UseGuards(AuthGuard)
    isAuthenticated(@Req() req: Request){
        const user: any = req.user;
        return user
    }

    // @Get()
    // getAll(){
    //     return this.boardsService.getAllBoards()
    // }

    @Post('/create')
    @UseGuards(AuthGuard)
    create(@Body() createBoardDto: CreateBoardDto, @Req() req: Request){
        const user: any = req.user
        const useremail = user.user
        this.boardsService.createBoard(createBoardDto, useremail)
    }

    @Delete('/delete')
    @UseGuards(AuthGuard)
    delete(@Body() body: any, @Req() req: Request){
        const user: any = req.user
        const useremail = user.user
        const boardId: number = body.boardId

        this.boardsService.deleteBoard(boardId, useremail)
    }
}
