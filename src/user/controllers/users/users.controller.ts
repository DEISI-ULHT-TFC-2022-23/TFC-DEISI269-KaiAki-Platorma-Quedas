import { Body,Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { createSecureServer } from 'http2';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { CreateUserProfileDto } from 'src/users/dtos/CreateUserProfile.dto';
import { UpdateserDto } from 'src/users/dtos/UpdateUser.dto';

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


    @Put(':id')
   async updateUserById(@Param('id', ParseIntPipe) id: number, 
    @Body() updateUserDto: UpdateserDto,) {
      await this.userService.updateUser(id, updateUserDto)

    }

   @Delete(':id')
   async deleteUserById(@Param('id', ParseIntPipe) id: number,
   ){
      await this.userService.deleteUser(id)

   }


    @Post(':id/profiles')
    createUserProfile(
      @Param('id',ParseIntPipe) id : number, 
      @Body() createUserProfileDto : CreateUserProfileDto){

      return this.userService.createUserProfile(id,createUserProfileDto);
    }
}
