import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { RepliesService } from './replies.service';
import { ReplyDto } from './dto/reply.dto';

@Controller('replies')
export class RepliesController {
    constructor( private repliesService: RepliesService){}

    @Post()
    createBoard(@Body() replyDto: ReplyDto){
        return this.repliesService.createReply(replyDto)
    }

    // @Post("reply")
    // getBoard(@Body() boardId: {boardId: number}){
    //     console.log(boardId)
    //     return this.repliesService.getReply(boardId)
    // }

    @Get("reply/:id")
    getBoard(@Param("id") id: string){
        return this.repliesService.getReply(+id)
    }
}
