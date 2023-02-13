import { Module } from '@nestjs/common';
import { QuedaService } from './services/queda/queda.service';
import { QuedaController } from './controllers/queda/queda.controller';

@Module({
  providers: [QuedaService],
  controllers: [QuedaController]
})
export class QuedaModule {}
