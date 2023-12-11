import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './security/passport.jwt.strategy';
import { Repository } from 'typeorm';
import { User } from 'src/users/entity/users.entity';
import { BoardsService } from 'src/boards/boards.service';
import { BoardsModule } from 'src/boards/boards.module';
import { Board } from 'src/boards/entity/boards.entity';
import { RepliesService } from 'src/replies/replies.service';
import { Reply } from 'src/replies/entity/replies.entity';

@Module({
  imports: [
    JwtModule.register({
      secret: "secret",
      signOptions: { expiresIn: '300s' }
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Board]),
    TypeOrmModule.forFeature([Reply]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtModule, JwtStrategy, BoardsService, RepliesService],
  exports: []
})
export class AuthModule {}
