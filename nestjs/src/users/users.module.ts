import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/users.entity';
// import { AuthService } from 'src/auth/auth.service';
// import { JwtService } from '@nestjs/jwt';
// import { AuthGuard, PassportModule } from '@nestjs/passport';
// import { JwtModule } from '@nestjs/jwt';
// import { JwtStrategy } from 'src/auth/security/passport.jwt.strategy';
// import { AuthModule } from 'src/auth/auth.module';
// import { AuthController } from 'src/auth/auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: []
})
export class UsersModule {}
