import { Controller } from '@nestjs/common';
import { ProfissionalSaudeService } from '../services/profissional-saude.service';

@Controller('profissional-saude')
export class ProfissionalSaudeController {
  constructor(
    private readonly profissionalSaudeService: ProfissionalSaudeService,
  ) {}

  // Add your routes and methods for the ProfissionalSaude entity here
}