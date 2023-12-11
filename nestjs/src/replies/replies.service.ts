import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reply } from './entity/replies.entity';
import { Repository } from 'typeorm';
import { ReplyDto } from './dto/reply.dto';
import { UserDto } from 'src/users/dto/user.dto';

@Injectable()
export class RepliesService {
    constructor(
        @InjectRepository(Reply) private repliesRepository: Repository<Reply>,
    ){}

    async createReply(replyDto: ReplyDto, useremail: string): Promise<ReplyDto>{
       
        return await this.repliesRepository.save({ user: useremail, content: replyDto.content, boardId: replyDto.boardId });
    }

    // async getReply(inputboardId: {boardId: number}): Promise<Reply[]>{

    //     return await this.repliesRepository.find({where: {boardId: inputboardId.boardId}})
    // }

    async getReply(boardId:number): Promise<Reply[]>{
        let nopwReply: any = await this.repliesRepository.find({relations: ['user'], where: {boardId: boardId}});
        nopwReply.map((item) => {
            if(item.user != null){
                item.user = item.user.email
            }
        })
        
        return nopwReply
        //return await this.repliesRepository.find({relations: ['user'], where: {boardId: boardId}})
    }
}
