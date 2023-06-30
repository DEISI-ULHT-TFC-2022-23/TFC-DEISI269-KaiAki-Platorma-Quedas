import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacienteProfissionalRepository } from './pacienteProfissional.repository';
import { PacienteProfissionalController } from './controllers/pacienteProfissional.controller';
import { PacienteProfissionalService } from './services/pacienteProfissional.services';

@Module({
  imports: [TypeOrmModule.forFeature([PacienteProfissionalRepository])],
  controllers: [PacienteProfissionalController],
  providers: [PacienteProfissionalService],
})
export class PacienteProfissionalModule {}