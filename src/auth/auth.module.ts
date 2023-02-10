import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport/dist';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from 'src/typeorm/entities/Profile';
import { User } from 'src/typeorm/entities/User';
import { UsersService } from 'src/users/services/users/users.service';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { LocalStrategy } from './Utils/LocalStrategy';

@Module({

  imports:[TypeOrmModule.forFeature([User,Profile]), PassportModule],
  controllers: [AuthController],
  providers: [{
    provide: 'AUTH_SERVICE',
    useClass: AuthService,
  },

{

  provide: 'USER_SERVICE',
  useClass: UsersService
},
LocalStrategy,

]
})
export class AuthModule {}
