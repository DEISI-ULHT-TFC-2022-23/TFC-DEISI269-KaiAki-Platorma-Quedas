import { Controller } from '@nestjs/common';
import { PacienteProfissionalService } from '../services/pacienteProfissional.services';

@Controller('paciente-profissional')
export class PacienteProfissionalController {
  constructor(
    private readonly pacienteProfissionalService: PacienteProfissionalService,
  ) {}

  // Add your routes and methods for the PacienteProfissional entity here
}