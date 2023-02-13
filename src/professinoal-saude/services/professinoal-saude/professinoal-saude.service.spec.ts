import { Test, TestingModule } from '@nestjs/testing';
import { ProfessinoalSaudeService } from './professinoal-saude.service';

describe('ProfessinoalSaudeService', () => {
  let service: ProfessinoalSaudeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfessinoalSaudeService],
    }).compile();

    service = module.get<ProfessinoalSaudeService>(ProfessinoalSaudeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
