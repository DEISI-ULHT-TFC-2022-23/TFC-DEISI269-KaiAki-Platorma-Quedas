import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PacienteProfissionalRepository } from '../pacienteProfissional.repository';
import { PacienteProfissional } from '../../typeorm/entities/pacienteProfissional.entity';

@Injectable()
export class PacienteProfissionalService {
  constructor(
    @InjectRepository(PacienteProfissionalRepository)
    private pacienteProfissionalRepository: PacienteProfissionalRepository,
  ) {}

  // Add any custom methods for the PacienteProfissional entity here
}