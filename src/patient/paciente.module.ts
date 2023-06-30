import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacienteRepository } from './paciente.repository';
import { PacienteController } from './controllers/patient.controller';
import { PacienteService } from './services/patient.service';

@Module({
  imports: [TypeOrmModule.forFeature([PacienteRepository])],
  controllers: [PacienteController],
  providers: [PacienteService],
})
export class PacienteModule {}