import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


// Import your controllers
import { QuedaController } from './controllers/queda.controller';
import { DataController } from './controllers/datacontroller';

// Import your services
import { QuedaService } from './services/queda.services';
import { DataService } from './services/data.services';

// Import your entities
import { Paciente } from '../typeorm/entities/Patient';
import { Queda } from '../typeorm/entities/queda';
import { HistoricoQueda } from '../typeorm/entities/HistoricoQuedas';
import { EventsModule } from 'src/socket/events.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Paciente, Queda, HistoricoQueda]),
    EventsModule],
  controllers: [QuedaController, DataController],
  providers: [QuedaService, DataService],
})
export class QuedaModule {}