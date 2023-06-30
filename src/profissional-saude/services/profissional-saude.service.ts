import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfissionalSaudeRepository } from '../profissionalSaude.repository';
import { ProfissionalSaude } from '../../typeorm/entities/ProfessionalSaude';

@Injectable()
export class ProfissionalSaudeService {
  constructor(
    @InjectRepository(ProfissionalSaudeRepository)
    private profissionalSaudeRepository: ProfissionalSaudeRepository,
  ) {}

  // Add any custom methods for the ProfissionalSaude entity here
}