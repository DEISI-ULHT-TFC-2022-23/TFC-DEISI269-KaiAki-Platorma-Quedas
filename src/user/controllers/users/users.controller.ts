import { Body,Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, ParseBoolPipe, ParseIntPipe, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { createSecureServer } from 'http2';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { CreateUserProfileDto } from 'src/users/dtos/CreateUserProfile.dto';
import { UpdateserDto } from 'src/users/dtos/UpdateUser.dto';
import { AuthGuard } from 'src/users/guards/auth/auth.guard';
import { ValidateCreateUserPipe } from 'src/users/pipes/validate-create-user/validate-create-user.pipe';

import { UsersService } from 'src/users/services/users/users.service';
import { CreateUserParams } from 'src/utils/types';
import { brotliDecompressSync } from 'zlib';

@Controller('users')
  
export class UsersController {
    constructor(@Inject('USER_SERVICE') private readonly userService: UsersService){}



  @UseGuards(AuthGuard)
    @Get()
   async getUsers( ){
    

      const users= await this.userService.findUsers();
      return users;

    }

    @Post('create')
    createUser(createUserDto: CreateUserDto) {
      console.log(createUserDto);
      return this.userService.createUser(createUserDto);


    }









    @Get(':id')
    getUserbyID(@Param('id', ParseIntPipe) id:number): any{

      const user= this.userService.fetchUserById(id);
      if(!user) 
        throw new HttpException (' User not found', HttpStatus.BAD_REQUEST);

        return user;

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
