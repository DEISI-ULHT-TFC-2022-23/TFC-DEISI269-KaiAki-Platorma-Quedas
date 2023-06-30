import {
    Entity,
    PrimaryColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { Paciente } from './patient';
  import { ProfissionalSaude } from './ProfessionalSaude';
import { forwardRef } from '@nestjs/common';
  
  @Entity('paciente_profissional')
  export class PacienteProfissional {
    
     
    @ManyToOne(() => ProfissionalSaude, (profissional) => profissional.pacienteProfissionais)
    @JoinColumn({ name: 'profissional_id' })
    @PrimaryColumn()
    profissionalId: number;
    profissional: ProfissionalSaude;
    
  }
