import { Test, TestingModule } from '@nestjs/testing';
import { HistoricoQuedaController } from './historico-queda.controller';

describe('HistoricoQuedaController', () => {
  let controller: HistoricoQuedaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoricoQuedaController],
    }).compile();

    controller = module.get<HistoricoQuedaController>(HistoricoQuedaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
