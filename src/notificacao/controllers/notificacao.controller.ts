import { Controller } from '@nestjs/common';
import { NotificacaoService } from '../services/notificacao.services';

@Controller('notificacao')
export class NotificacaoController {
  constructor(private readonly notificacaoService: NotificacaoService) {}

  // Add your routes and methods for the Notificacao entity here
}