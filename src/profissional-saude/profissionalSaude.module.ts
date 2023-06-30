import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfissionalSaudeRepository } from './profissionalSaude.repository';
import { ProfissionalSaudeController } from './controllers/profissionalSaude.controller';
import { ProfissionalSaudeService } from './services/profissional-saude.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProfissionalSaudeRepository])],
  controllers: [ProfissionalSaudeController],
  providers: [ProfissionalSaudeService],
})
export class ProfissionalSaudeModule {}