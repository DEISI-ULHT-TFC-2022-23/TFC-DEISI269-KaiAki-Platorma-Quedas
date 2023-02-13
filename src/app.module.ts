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
import { PatientsModule } from './patients/patients.module';
import { AuthModule } from './auth/auth.module';
import { ProfessinoalSaudeModule } from './professinoal-saude/professinoal-saude.module';
import { QuedaModule } from './queda/queda.module';
import { NotificacaoModule } from './notificacao/notificacao.module';
import { HistoricoQuedaModule } from './historico-queda/historico-queda.module';


@Module({
  imports: [TypeOrmModule.forRoot({
    type:'mysql',
    host:'localhost',
    username:'mj',
    password:'hello',
    database:'nestjs_mysql_kaiaki',
    entities:[User,Profile,HistoricoQueda,ProfessionalSaude,Queda,Patient,Notificacao],
    synchronize:true,

  }), UsersModule, PatientsModule, AuthModule, ProfessinoalSaudeModule, QuedaModule, NotificacaoModule, HistoricoQuedaModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
