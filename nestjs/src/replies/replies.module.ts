import { Module } from '@nestjs/common';
import { RepliesController } from './replies.controller';
import { RepliesService } from './replies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reply } from './entity/replies.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reply])],
  controllers: [RepliesController],
  providers: [RepliesService]
})
export class RepliesModule {}
