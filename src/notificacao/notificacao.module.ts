import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificacaoRepository } from './notificacao.repository';
import { NotificacaoController } from './controllers/notificacao.controller';
import { NotificacaoService } from './services/notificacao.services';

@Module({
  imports: [TypeOrmModule.forFeature([NotificacaoRepository])],
  controllers: [NotificacaoController],
  providers: [NotificacaoService],
})
export class NotificacaoModule {}