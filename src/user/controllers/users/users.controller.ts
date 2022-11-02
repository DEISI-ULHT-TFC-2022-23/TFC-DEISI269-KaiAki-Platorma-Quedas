import { Body,Controller, Get, Post } from '@nestjs/common';
import { createSecureServer } from 'http2';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';
import { brotliDecompressSync } from 'zlib';

@Controller('users')
export class UsersController {
    constructor(private userService:UsersService ){}

    @Get()
   async getUsers(){
      const users= await this.userService.findUsers();
      return users;

    }

    @Post()
    createUser(@Body() CreateUserDto: CreateUserDto) {
       return this.userService.createUser(CreateUserDto);

    }




}
