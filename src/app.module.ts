import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UsersModule } from './users/users.module';
import { Profile } from './typeorm/entities/Profile';
import { join } from 'path';
import { EventsGateway } from './socket/events.gateway';
import { QuedaModule } from './queda/queda.module';
import { Queda } from './typeorm/entities/queda';
import { Paciente } from './typeorm/entities/Patient';
import { HistoricoQueda } from './typeorm/entities/HistoricoQuedas';
import { Notificacao } from './typeorm/entities/Notificacao';
import { PacienteProfissional } from './typeorm/entities/pacienteProfissional.entity';
import { ProfissionalSaude } from './typeorm/entities/ProfessionalSaude';
import { ProfissionalSaudeModule } from './profissional-saude/profissionalSaude.module';
import { PacienteModule } from './patient/paciente.module';
import { PacienteProfissionalModule } from './pacienteProfissional/pacienteProfissional.module';
import { HttpAdapterHost } from '@nestjs/core';
import { EventsModule } from './socket/events.module';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306, 
    username: 'tfc',
    password: '12345',
    database:'tfcbd',
    entities: [User, Profile, Queda, Paciente, HistoricoQueda, Notificacao, PacienteProfissional, ProfissionalSaude],
    synchronize: true,
  }), UsersModule, QuedaModule, ProfissionalSaudeModule, PacienteModule, PacienteProfissionalModule,EventsModule, ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'public'),
  })],
  controllers: [AppController],
  providers: [AppService, EventsGateway, 
    ],
})
export class AppModule {}