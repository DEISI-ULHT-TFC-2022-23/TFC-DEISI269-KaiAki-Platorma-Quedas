import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';

@Controller('auth')
export class AuthController {


  @UseGuards(AuthGuard('local'))  
  @Post('login')
    async login(@Request() req){

    }
}
