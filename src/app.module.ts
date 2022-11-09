import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';

import { UsersController } from './user/controllers/users/users.controller';
import { Profile } from './typeorm/entities/Profile';

@Module({
  imports: [TypeOrmModule.forRoot({
    type:'mysql',
    host:'localhost',
    port: 3306,
    username:'mj',
    password:'hello',
    database:'nestjs_mysql_kaiaki',
    entities:[User,Profile],
    synchronize:true,

  }), UsersModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
