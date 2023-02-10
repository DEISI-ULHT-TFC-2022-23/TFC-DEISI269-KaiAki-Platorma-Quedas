import { Module, NestModule,MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoricoQueda } from 'src/typeorm/entities/HistoricoQuedas';
import { Notificacao } from 'src/typeorm/entities/Notificacao';
import { Patient } from 'src/typeorm/entities/Patient';
import { ProfessionalSaude } from 'src/typeorm/entities/ProfessionalSaude';
import { Profile } from 'src/typeorm/entities/Profile';
import { Queda } from 'src/typeorm/entities/Queda';
import { User } from 'src/typeorm/entities/User';
import { UsersController } from 'src/user/controllers/users/users.controller';
import { ExMiddleware } from './middlewares/ex/ex.middleware';
import { UsersService } from './services/users/users.service';


@Module({
  imports:[TypeOrmModule.forFeature([User,Profile,Queda,ProfessionalSaude,Patient,Notificacao,HistoricoQueda])],
  providers: [{
    provide: 'USER_SERVICE',
    useClass: UsersService,
  }],
  controllers:[UsersController],
})
export class UsersModule  implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ExMiddleware).forRoutes(

      {
          path:'users',
          method: RequestMethod.GET,
      },



      {
        path: 'users/id',
        method: RequestMethod.GET,
      },


    );
  }
}
