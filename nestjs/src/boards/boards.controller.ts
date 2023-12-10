import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService){}
    
    // @Post()
    // createBoard(@Body() createBoardDto: CreateBoardDto){

    //     return this.boardsService.createBoard(createBoardDto)
    // }

    @Get()
    getAll(){
        return this.boardsService.getAllBoards()
    }

    @Get(":id")
    getOnById(@Param("id") id: string){
        
        return this.boardsService.getOneBoardById(+id)
    }
}
