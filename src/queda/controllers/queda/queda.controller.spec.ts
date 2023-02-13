import { Test, TestingModule } from '@nestjs/testing';
import { QuedaController } from './queda.controller';

describe('QuedaController', () => {
  let controller: QuedaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuedaController],
    }).compile();

    controller = module.get<QuedaController>(QuedaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
