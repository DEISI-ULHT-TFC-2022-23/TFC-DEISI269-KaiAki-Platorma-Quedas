import { EntityRepository, Repository } from 'typeorm';
import { Notificacao } from '../typeorm/entities/Notificacao';

@EntityRepository(Notificacao)
export class NotificacaoRepository extends Repository<Notificacao> {
  // Add any custom methods for the Notificacao entity here
}