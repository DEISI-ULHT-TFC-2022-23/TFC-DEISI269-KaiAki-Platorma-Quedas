import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { CreateUserProfileDto } from 'src/users/dtos/CreateUserProfile.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { UserService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {

    constructor(private userService: UserService){

    }

    @Get()
    async getUsers() {
        return this.userService.findUsers();
     
    }   
    
    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
    }

    @Put(':id')
    async updateUserById(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto,){
        await this.userService.updateUser(id, updateUserDto)
    }

    @Delete(':id')
    async deleteUserById(@Param('id', ParseIntPipe) id: number,){
        await this.userService.deleteUser(id)
    }

    @Post(':id/profiles')
    createUserProfile(@Param('id', ParseIntPipe) id: number,
    @Body() CreateUserProfileDto: CreateUserProfileDto) {
        return this.userService.createUserProfile(id, CreateUserProfileDto);
    }
}
