import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './entity/boards.entity';
import { Repository } from 'typeorm';
import { ListedBoardDto } from './dto/listed-board.dto';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
    constructor( @InjectRepository(Board) private boardsRepository: Repository<Board>){}

    async getAllBoards(): Promise<any>{

        //return await this.boardsRepository.find({select: ['title', 'user', 'id']})
        return await this.boardsRepository.find({relations: ['user'], select: ['title', 'id']})
    }
    
    async getOneBoardById(boardId: number): Promise<Board>{
        let userNoPW: any = await this.boardsRepository.findOne({relations: ["user"], where: {id: boardId}})
        if(userNoPW.user !== null){
            userNoPW.user = userNoPW.user.email;
        }

        return userNoPW
    }

    async createBoard(createBoard: CreateBoardDto, useremail: string){
        const createdBoard = {
            title: createBoard.title,
            content: createBoard.content,
            user: useremail,
            //date: new Date().toISOString().slice(0, 19).replace('T', ' ')
        }
        
        return await this.boardsRepository.save(createdBoard)
    }

    async deleteBoard(boardId: number, useremail: string){
        const board = await this.getOneBoardById(boardId)
        if(board.user === useremail){
            return await this.boardsRepository.delete(boardId)
        }
    }
}
