import { Module } from '@nestjs/common';
import { NotificacaoService } from './services/notificacao/notificacao.service';
import { NotificacaoController } from './controllers/notificacao/notificacao.controller';

@Module({
  providers: [NotificacaoService],
  controllers: [NotificacaoController]
})
export class NotificacaoModule {}
