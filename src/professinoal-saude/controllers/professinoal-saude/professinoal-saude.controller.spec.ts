import { Test, TestingModule } from '@nestjs/testing';
import { ProfessinoalSaudeController } from './professinoal-saude.controller';

describe('ProfessinoalSaudeController', () => {
  let controller: ProfessinoalSaudeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfessinoalSaudeController],
    }).compile();

    controller = module.get<ProfessinoalSaudeController>(ProfessinoalSaudeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
