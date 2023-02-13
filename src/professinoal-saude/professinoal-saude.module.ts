import { Module } from '@nestjs/common';
import { ProfessinoalSaudeController } from './controllers/professinoal-saude/professinoal-saude.controller';
import { ProfessinoalSaudeService } from './services/professinoal-saude/professinoal-saude.service';

@Module({
  controllers: [ProfessinoalSaudeController],
  providers: [ProfessinoalSaudeService]
})
export class ProfessinoalSaudeModule {}
