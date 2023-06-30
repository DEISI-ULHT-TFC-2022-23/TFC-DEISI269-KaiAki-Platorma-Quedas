import { EntityRepository, Repository } from 'typeorm';
import { ProfissionalSaude } from '../typeorm/entities/ProfessionalSaude';

@EntityRepository(ProfissionalSaude)
export class ProfissionalSaudeRepository extends Repository<ProfissionalSaude> {
  // Add any custom methods for the ProfissionalSaude entity here
}