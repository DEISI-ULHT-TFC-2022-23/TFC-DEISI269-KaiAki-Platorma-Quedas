import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from 'src/typeorm/entities/Profile';
import { User } from 'src/typeorm/entities/User';
import { UsersController } from 'src/user/controllers/users/users.controller';
import { UsersService } from './services/users/users.service';


@Module({
  imports:[TypeOrmModule.forFeature([User,Profile])],
  providers: [UsersService],
  controllers:[UsersController],
})
export class UsersModule {}
