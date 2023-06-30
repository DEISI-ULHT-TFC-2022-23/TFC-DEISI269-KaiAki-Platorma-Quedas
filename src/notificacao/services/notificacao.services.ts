import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificacaoRepository } from '../notificacao.repository';
import { Notificacao } from '../../typeorm/entities/Notificacao';

@Injectable()
export class NotificacaoService {
  constructor(
    @InjectRepository(NotificacaoRepository)
    private notificacaoRepository: NotificacaoRepository,
  ) {}

  // Add any custom methods for the Notificacao entity here
}