import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardsModule } from './boards/boards.module';
import { UsersModule } from './users/users.module';
import { RepliesModule } from './replies/replies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { Board } from './boards/entity/boards.entity';

@Module({
  imports: [TypeOrmModule.forRoot(
    {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'pmss951623@',
      database: 'test1',
      entities: ["dist/**/*.entity.js"],
      synchronize: true,
    }
  ), BoardsModule, UsersModule, RepliesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
