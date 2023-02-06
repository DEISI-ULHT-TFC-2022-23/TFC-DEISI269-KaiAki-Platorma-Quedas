import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';

import { UsersController } from './user/controllers/users/users.controller';
import { Profile } from './typeorm/entities/Profile';
import { HistoricoQueda } from './typeorm/entities/HistoricoQuedas';
import { ProfessionalSaude } from './typeorm/entities/ProfessionalSaude';
import { Queda } from './typeorm/entities/Queda';
import { Patient } from './typeorm/entities/Patient';
import { Notificacao } from './typeorm/entities/Notificacao';


@Module({
  imports: [TypeOrmModule.forRoot({
    type:'mysql',
    host:'localhost',
    username:'mj',
    password:'hello',
    database:'nestjs_mysql_kaiaki',
    entities:[User,Profile,HistoricoQueda,ProfessionalSaude,Queda,Patient,Notificacao],
    synchronize:true,

  }), UsersModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
