import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoricoQuedaRepository } from './historicoQueda.repository';
import { HistoricoQuedaController } from './controllers/historicoQueda.controller';
import { HistoricoQuedaService } from './services/historio-queda.services';

@Module({
  imports: [TypeOrmModule.forFeature([HistoricoQuedaRepository])],
  controllers: [HistoricoQuedaController],
  providers: [HistoricoQuedaService],
})
export class HistoricoQuedaModule {}