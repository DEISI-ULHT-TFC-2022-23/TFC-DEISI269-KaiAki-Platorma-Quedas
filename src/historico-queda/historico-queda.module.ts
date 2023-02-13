import { Module } from '@nestjs/common';
import { HistoricoQuedaController } from './controllers/historico-queda/historico-queda.controller';
import { HistoricoQuedaService } from './services/historico-queda/historico-queda.service';

@Module({
  controllers: [HistoricoQuedaController],
  providers: [HistoricoQuedaService]
})
export class HistoricoQuedaModule {}
