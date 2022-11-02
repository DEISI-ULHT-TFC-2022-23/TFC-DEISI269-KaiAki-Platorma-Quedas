import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { UsersController } from 'src/user/controllers/users/users.controller';
import { UsersService } from './services/users/users.service';


@Module({
  imports:[TypeOrmModule.forFeature([User])],
  providers: [UsersService],
  controllers:[UsersController],
})
export class UsersModule {}
